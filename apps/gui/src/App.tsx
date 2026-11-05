import type { Ad } from '@garimpeiro/core/browser'
import { useState } from 'react'

import { SearchForm } from '@/components/SearchForm.tsx'
import type { ScrapeResponse } from '@/lib/api.ts'

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export default function App() {
  const [matches, setMatches] = useState<Ad[]>([])
  const [meta, setMeta] = useState<Pick<
    ScrapeResponse,
    'scrapedCount' | 'priceBand'
  > | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  return (
    <div className="app">
      <h1>Garimpeiro OLX</h1>
      <p className="subtitle">
        Configure uma busca e veja anúncios dentro da faixa de preço.
      </p>

      <SearchForm
        onResults={(result) => {
          setHasSearched(true)
          setMatches(result.matches)
          setMeta({
            scrapedCount: result.scrapedCount,
            priceBand: result.priceBand,
          })
        }}
        onError={setError}
        onLoading={setLoading}
      />

      {loading && (
        <p className="card muted" role="status">
          Buscando na OLX…
        </p>
      )}

      {error && (
        <p className="card error" role="alert">
          {error}
        </p>
      )}

      {!loading && hasSearched && !error && matches.length === 0 && meta && (
        <p className="card muted">
          {meta.scrapedCount === 0
            ? 'Nenhum anúncio foi extraído da página da OLX.'
            : `Encontramos ${meta.scrapedCount} anúncio(s), mas nenhum entre ${formatPrice(meta.priceBand.min)} e ${formatPrice(meta.priceBand.max)}. Aumente o percentual ou ajuste o preço alvo.`}
        </p>
      )}

      {matches.length > 0 && (
        <section className="card results">
          <h2>{matches.length} oferta(s) na faixa</h2>
          {meta && (
            <p className="muted">
              {meta.scrapedCount} anúncio(s) analisado(s) · faixa{' '}
              {formatPrice(meta.priceBand.min)} –{' '}
              {formatPrice(meta.priceBand.max)}
            </p>
          )}
          <ul>
            {matches.map((ad) => (
              <li key={ad.link}>
                <strong>{ad.title}</strong>
                <br />
                {formatPrice(ad.price)} —{' '}
                <a href={ad.link} target="_blank" rel="noreferrer">
                  Ver anúncio
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
