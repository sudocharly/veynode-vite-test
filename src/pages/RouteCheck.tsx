import { Link, useLocation } from 'react-router'
import { publicUrl } from '../lib/publicUrl.ts'
import { usePageTitle } from '../lib/usePageTitle.ts'

export function RouteCheck() {
  const location = useLocation()
  usePageTitle('Routes · Veynode static check')

  return (
    <article className="page">
      <p className="eyebrow">Client routes</p>
      <h1>Refresh this address.</h1>
      <p className="lede">
        React Router reads the URL in the browser. A refresh, or one of the
        full-page links below, asks the host for that path. The host should
        answer with this app.
      </p>

      <section className="block" aria-labelledby="location-title">
        <h2 id="location-title">This address</h2>
        <dl className="facts">
          <dt>Path</dt>
          <dd>{location.pathname}</dd>
          <dt>Query</dt>
          <dd>{location.search || 'None'}</dd>
          <dt>Hash</dt>
          <dd>{location.hash || 'None'}</dd>
        </dl>
      </section>

      <section className="block" aria-labelledby="client-title">
        <h2 id="client-title">Stay in the page</h2>
        <p className="section-copy">
          These links change the URL without loading a new document.
        </p>
        <ul className="link-list">
          <li>
            <Link to="/routes">/routes</Link>
          </li>
          <li>
            <Link to="/routes/nested">/routes/nested</Link>
          </li>
          <li>
            <Link to="/routes/nested?sample=1">/routes/nested?sample=1</Link>
          </li>
          <li>
            <Link to="/routes/nested#field">/routes/nested#field</Link>
          </li>
        </ul>
      </section>

      <section className="block" aria-labelledby="host-title">
        <h2 id="host-title">Ask the host</h2>
        <p className="section-copy">
          These are ordinary links. The browser requests the URL. If the
          sidebar and this layout come back, the host served{' '}
          <code>index.html</code> for a path that is not a real file.
        </p>
        <ul className="link-list">
          <li>
            <a href={publicUrl('routes/nested')}>/routes/nested</a>
          </li>
          <li>
            <a href={publicUrl('assets')}>/assets</a>
          </li>
        </ul>
      </section>

      <section className="block" id="field" aria-labelledby="field-title">
        <h2 id="field-title">Field mark</h2>
        <p className="section-copy">
          This section is the target of the <code>#field</code> link. After
          that link, this heading should sit near the top of the page. The
          query <code>sample=1</code> is only here so the address bar has
          something to show. The app does not send it anywhere.
        </p>
      </section>
    </article>
  )
}
