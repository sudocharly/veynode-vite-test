import { useEffect, useState } from 'react'
import bundledMark from '../assets/mark.svg?no-inline'
import { useCatalog } from '../lib/useCatalog.ts'

type Status = 'pass' | 'waiting' | 'fail'

type CheckState = {
  status: Status
  detail: string
}

const waiting = (detail: string): CheckState => ({ status: 'waiting', detail })

function label(status: Status) {
  if (status === 'pass') return 'Pass'
  if (status === 'fail') return 'Failed'
  return 'Waiting'
}

function readStylesheet(): CheckState {
  const ink = getComputedStyle(document.documentElement)
    .getPropertyValue('--ink')
    .trim()
    .toLowerCase()
  if (ink === '#161410') {
    return {
      status: 'pass',
      detail: 'Custom property --ink is #161410, so the stylesheet applied.',
    }
  }
  return {
    status: 'fail',
    detail: ink
      ? `Expected --ink to be #161410, and the page has ${ink}.`
      : 'The --ink custom property is missing, so the stylesheet likely did not apply.',
  }
}

export function LiveChecks() {
  const catalog = useCatalog()
  const stylesheet = readStylesheet()
  const [typeface, setTypeface] = useState<CheckState>(
    waiting('Loading Fraunces and Outfit.'),
  )
  const [image, setImage] = useState<CheckState>(
    waiting('Decoding the bundled mark.'),
  )

  useEffect(() => {
    let cancelled = false

    async function loadFaces() {
      if (!document.fonts) {
        setTypeface({
          status: 'fail',
          detail: 'This browser does not expose the Font Loading API.',
        })
        return
      }
      try {
        const [display, italic, body] = await Promise.all([
          document.fonts.load("560 16px 'Fraunces Variable'"),
          document.fonts.load("italic 460 16px 'Fraunces Variable'"),
          document.fonts.load("400 16px 'Outfit Variable'"),
        ])
        if (cancelled) return
        if (display.length > 0 && italic.length > 0 && body.length > 0) {
          setTypeface({
            status: 'pass',
            detail: 'Fraunces and Outfit are active.',
          })
          return
        }
        setTypeface({
          status: 'fail',
          detail:
            'A typeface file did not activate. Headlines may be using the fallback serif.',
        })
      } catch {
        if (cancelled) return
        setTypeface({
          status: 'fail',
          detail: 'The browser rejected the font load.',
        })
      }
    }

    void loadFaces()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const picture = new Image()
    picture.onload = () => {
      if (cancelled) return
      if (picture.naturalWidth > 0 && picture.naturalHeight > 0) {
        setImage({
          status: 'pass',
          detail: `Decoded at ${picture.naturalWidth}×${picture.naturalHeight}.`,
        })
        return
      }
      setImage({
        status: 'fail',
        detail: 'The bundled mark loaded without a measurable size.',
      })
    }
    picture.onerror = () => {
      if (cancelled) return
      setImage({
        status: 'fail',
        detail: 'The bundled mark request failed.',
      })
    }
    picture.src = bundledMark
    return () => {
      cancelled = true
    }
  }, [])

  const catalogCheck: CheckState =
    catalog.state.status === 'loading'
      ? waiting('Requesting catalog.json.')
      : catalog.state.status === 'error'
        ? { status: 'fail', detail: catalog.state.message }
        : {
            status: 'pass',
            detail:
              catalog.state.catalog.files.length === 0
                ? `Loaded ${catalog.state.catalog.name}. The file list is empty.`
                : `Loaded ${catalog.state.catalog.name} with ${catalog.state.catalog.files.length} listed files.`,
          }

  const checks: Array<CheckState & { id: string; title: string }> = [
    {
      id: 'script',
      title: 'JavaScript',
      status: 'pass',
      detail: 'React mounted this list, so the script bundle ran.',
    },
    { id: 'stylesheet', title: 'Stylesheet', ...stylesheet },
    { id: 'type', title: 'Type', ...typeface },
    { id: 'image', title: 'Bundled image', ...image },
    { id: 'catalog', title: 'Public JSON', ...catalogCheck },
  ]

  const pending = checks.some((check) => check.status === 'waiting')

  return (
    <ul className="check-list" aria-live="polite" aria-busy={pending}>
      {checks.map((check) => (
        <li key={check.id}>
          <span className={`status status-${check.status}`}>
            {label(check.status)}
          </span>
          <div>
            <h3>{check.title}</h3>
            <p>{check.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
