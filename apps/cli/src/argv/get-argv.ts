import { ddds, ordens, ufs } from '@garimpeiro/core'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export function getArgv() {
  return yargs(hideBin(process.argv))
    .scriptName('garimpeiro')
    .usage(
      'Uso: $0 [opções]\n\nMonitora anúncios na OLX e avisa quando encontrar ofertas no preço desejado.'
    )
    .options({
      uf: {
        choices: [...ufs],
        demandOption: true,
        alias: 'estado',
        type: 'string',
        describe:
          'Sigla do estado (UF) na URL da OLX. Ex.: sp → www.olx.com.br/estado-sp/...',
      },
      ddd: {
        choices: [...ddds],
        type: 'number',
        describe:
          'Código DDD da região OLX. Define qual bloco regional entra na URL (obrigatório na prática para montar a busca).',
      },
      zona: {
        type: 'string',
        describe:
          'Nome da zona/subregião OLX (será convertido para kebab-case na URL). Ex.: "vale do paraiba".',
      },
      cidade: {
        type: 'string',
        describe:
          'Nome da cidade dentro da zona (kebab-case na URL). Só é aplicada se zona também for informada.',
      },
      produto: {
        type: 'string',
        demandOption: true,
        describe: 'Termo de busca enviado como parâmetro q= na OLX.',
      },
      preco: {
        type: 'number',
        demandOption: true,
        describe:
          'Preço de referência em reais (número inteiro). Usado com --percentual para definir a faixa aceita.',
      },
      percentual: {
        type: 'number',
        default: 10,
        describe:
          'Variação percentual em relação ao preço. Ex.: preço R$100 e percentual 10% → notifica entre R$90 e R$110. Use 0 para preço exato.',
        alias: 'porcentagem',
      },
      ordem: {
        choices: [...ordens],
        default: 'mais relevantes',
        alias: 'ordernar-por',
        type: 'string',
        describe:
          'Ordenação dos anúncios: mais relevantes (padrão OLX), mais recentes ou menor preço.',
      },
      intervalo: {
        type: 'number',
        default: 60,
        describe: 'Intervalo em minutos entre cada execução do garimpo.',
        alias: 'delay',
      },
      paginas: {
        type: 'number',
        default: 1,
        describe:
          'Quantidade de páginas de resultados a verificar (1 = só a primeira).',
        alias: 'pags',
      },
      pararAoEncontrarOfertas: {
        type: 'boolean',
        default: true,
        describe:
          'Encerra o programa ao encontrar ofertas compatíveis (após notificar).',
        alias: 'parar-ao-encontrar-ofertas',
      },
      notificarViaLog: {
        type: 'boolean',
        default: true,
        describe:
          'Exibe ofertas encontradas no terminal com destaque colorido.',
        alias: 'notificar-via-log',
      },
      notificarViaDesktop: {
        type: 'boolean',
        default: true,
        describe:
          'Envia notificação nativa do sistema (Linux/macOS/Windows) ao encontrar ofertas.',
        alias: 'notificar-via-desktop',
      },
    })
    .check((argv) => {
      const hasCity = Boolean(argv.cidade?.trim())
      const hasZone = Boolean(argv.zona?.trim())
      if (hasCity && !hasZone) {
        throw new Error(
          'Informe --zona quando usar --cidade (a cidade depende da zona na URL da OLX).'
        )
      }
      if (!argv.ddd) {
        throw new Error(
          'Informe --ddd para definir a região OLX (ex.: 12 para Vale do Paraíba em SP).'
        )
      }
      return true
    })
    .example(
      '$0 --uf sp --ddd 12 --zona "vale do paraiba" --cidade "sao jose dos campos" --produto apartamento --preco 300000',
      'Apartamentos em São José dos Campos com preço alvo R$ 300.000'
    )
    .example(
      '$0 --uf sp --ddd 11 --produto iphone --preco 2500 --percentual 0 --paginas 2',
      'iPhone por exatamente R$ 2.500 em São Paulo capital (2 páginas)'
    )
    .example(
      '$0 --uf rj --ddd 21 --produto notebook --preco 4000 --intervalo 30 --parar-ao-encontrar-ofertas false',
      'Notebook no Rio; repete a cada 30 min até você interromper'
    )
    .help()
    .alias('help', 'h')
    .strict()
}
