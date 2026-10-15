import { Link, useLocation } from 'react-router'
import { usePageTitle } from '../lib/usePageTitle.ts'

export function MissingPage() {
  const location = useLocation()
  usePageTitle('Page not found · Veynode static check')

  return (
    <article className="page">
      <p className="eyebrow">Unknown path</p>
      <h1>This route is not part of the check.</h1>
      <p className="lede">
        The app received <code>{location.pathname}</code>. This layout means
        the host returned the React app, and the router had no page for that
        path. A host-level 404 would not show this sidebar.
      </p>
      <div className="actions">
        <Link className="button" to="/">
          Back to overview
        </Link>
      </div>
    </article>
  )
}
