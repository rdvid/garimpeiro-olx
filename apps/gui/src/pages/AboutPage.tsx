import { Alert } from '@/components/ui/Alert.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'

export function AboutPage() {
  return (
    <div>
      <PageHeader
        title="Sobre"
        description="Garimpeiro monitora anúncios da OLX dentro de uma faixa de preço."
      />
      <div className="stack" style={{ maxWidth: 640 }}>
        <Alert tone="info" title="API local">
          A interface chama <code>/api/scrape</code> no backend Fastify. Inicie
          com <code>make dev</code> ou <code>npm run dev:gui</code>.
        </Alert>
        <div className="panel panel-body muted">
          <p>
            Domínio de scrape: <strong>@garimpeiro/core</strong>. Notificações
            desktop e loop contínuo ficam no CLI.
          </p>
          <p style={{ marginBottom: 0 }}>
            Este painel é um workspace local: histórico e buscas salvas não saem
            do navegador.
          </p>
        </div>
      </div>
    </div>
  )
}
