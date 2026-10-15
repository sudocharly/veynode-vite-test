import { Link } from 'react-router'
import { LiveChecks } from '../components/LiveChecks.tsx'
import { SessionNote } from '../components/SessionNote.tsx'
import { usePageTitle } from '../lib/usePageTitle.ts'

export function Overview() {
  usePageTitle('Veynode static check')

  return (
    <article className="page">
      <p className="eyebrow">Static hosting check</p>
      <h1>
        <span className="title-lead">The files either arrived,</span>
        or they did not.
      </h1>
      <p className="lede">
        This is a static React app for checking a Veynode deploy. The type,
        color, and checks below only look right if the document, the stylesheet,
        and the script all arrived.
      </p>
      <div className="actions">
        <a className="button" href="#checks">
          Review the checks
        </a>
        <Link className="button button-secondary" to="/routes/nested">
          Open a deep route
        </Link>
      </div>

      <section className="block" id="checks" aria-labelledby="checks-title">
        <h2 id="checks-title">Live checks</h2>
        <p className="section-copy">
          These run in the browser after load. Each row says Pass, Waiting, or
          Failed. Color repeats that word; it does not replace it.
        </p>
        <LiveChecks />
      </section>

      <section className="block" aria-labelledby="try-title">
        <h2 id="try-title">What to try</h2>
        <ol className="steps">
          <li>
            <a href="#checks">Read the live checks.</a> Each row should say
            Pass.
          </li>
          <li>
            <Link to="/routes/nested">Open the nested route</Link>, then
            refresh the browser. You should get this app again, still on that
            path.
          </li>
          <li>
            <Link to="/assets">Open Assets</Link>. You should see an outlined
            mark, a filled mark, and a catalog read from a JSON file.
          </li>
          <li>
            Save a session note below, then refresh. The note should still be
            in the field.
          </li>
        </ol>
      </section>

      <SessionNote />
    </article>
  )
}
