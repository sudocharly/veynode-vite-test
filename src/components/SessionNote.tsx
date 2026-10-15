import { useState } from 'react'
import type { FormEvent } from 'react'

const STORAGE_KEY = 'veynode-note'

function readNote() {
  try {
    return {
      blocked: false,
      value: sessionStorage.getItem(STORAGE_KEY) ?? '',
    }
  } catch {
    return { blocked: true, value: '' }
  }
}

export function SessionNote() {
  const [snapshot] = useState(readNote)
  const [blocked, setBlocked] = useState(snapshot.blocked)
  const [draft, setDraft] = useState(snapshot.value)
  const [saved, setSaved] = useState(snapshot.value)
  const [error, setError] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = draft.trim()
    if (!value) {
      setError('Write a short note before saving.')
      setJustSaved(false)
      return
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, value)
    } catch {
      setBlocked(true)
      setError('This browser blocked session storage, so the note was not kept.')
      setJustSaved(false)
      return
    }
    setSaved(value)
    setDraft(value)
    setError('')
    setJustSaved(true)
  }

  let status = 'Nothing saved in this tab yet.'
  if (blocked) {
    status =
      'Session storage is unavailable, so a note cannot be kept in this tab.'
  } else if (saved && justSaved) {
    status = 'Saved in this tab. Refresh the page and the note should still be in the field.'
  } else if (saved) {
    status = 'Already in this tab. Refresh and it should remain in the field.'
  }

  return (
    <section className="block" aria-labelledby="note-title">
      <h2 id="note-title">Session note</h2>
      <p className="section-copy">
        Saving stores the note in this tab only. It checks that JavaScript can
        remember something. Nothing is sent to a server.
      </p>
      <form className="note-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="note">Note</label>
        <div className="form-row">
          <input
            id="note"
            name="note"
            value={draft}
            maxLength={140}
            disabled={blocked}
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'note-error' : 'note-status'}
            onChange={(event) => {
              setDraft(event.target.value)
              if (error) setError('')
            }}
          />
          <button className="button" type="submit" disabled={blocked}>
            Save note
          </button>
        </div>
        {error ? (
          <p id="note-error" className="form-error" role="alert">
            {error}
          </p>
        ) : (
          <p id="note-status" className="form-status" role="status">
            {status}
          </p>
        )}
      </form>
    </section>
  )
}
