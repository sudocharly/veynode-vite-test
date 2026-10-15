import bundledMark from '../assets/mark.svg?no-inline'
import { useCatalog } from '../lib/useCatalog.ts'
import { publicUrl } from '../lib/publicUrl.ts'
import { usePageTitle } from '../lib/usePageTitle.ts'

export function AssetsPage() {
  usePageTitle('Assets · Veynode static check')
  const { state, retry } = useCatalog()
  const publicMark = publicUrl('mark.svg')

  return (
    <article className="page">
      <p className="eyebrow">Static files</p>
      <h1>Two kinds of files.</h1>
      <p className="lede">
        The outlined mark and the catalog are copied from <code>public/</code>{' '}
        and keep their names. The filled mark is imported from{' '}
        <code>src</code>, and the production build gives it a hashed filename.
      </p>

      <section className="block" aria-labelledby="marks-title">
        <h2 id="marks-title">Marks</h2>
        <div className="marks">
          <figure className="mark-card">
            <img
              src={publicMark}
              width="64"
              height="64"
              alt="Outlined square containing a letter V"
            />
            <figcaption>
              <strong>Public file</strong>
              <p>The URL stays stable.</p>
            </figcaption>
          </figure>
          <figure className="mark-card">
            <img
              src={bundledMark}
              width="64"
              height="64"
              alt="Filled square containing a letter V and a small dot"
            />
            <figcaption>
              <strong>Bundled file</strong>
              <p>Vite fingerprints this in the build.</p>
            </figcaption>
          </figure>
        </div>
        <dl className="facts facts-spaced">
          <dt>Public URL</dt>
          <dd>
            <code>{publicMark}</code>
          </dd>
          <dt>Bundled URL</dt>
          <dd>
            <code>{bundledMark}</code>
          </dd>
        </dl>
      </section>

      <section className="block" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Catalog</h2>
        <p className="section-copy">
          The list below is the body of <code>catalog.json</code>, not a list
          written into the page.
        </p>
        <div className="catalog" aria-live="polite">
          {state.status === 'loading' ? <p>Reading catalog.json…</p> : null}
          {state.status === 'error' ? (
            <>
              <p className="form-error" role="alert">
                {state.message}
              </p>
              <button className="button button-secondary" type="button" onClick={retry}>
                Try the catalog again
              </button>
            </>
          ) : null}
          {state.status === 'ready' && state.catalog.files.length === 0 ? (
            <p>The catalog loaded and its file list is empty.</p>
          ) : null}
          {state.status === 'ready' && state.catalog.files.length > 0 ? (
            <ul className="catalog-list">
              {state.catalog.files.map((file) => (
                <li key={file.path}>
                  <code>{file.path}</code>
                  <span>{file.role}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </article>
  )
}
