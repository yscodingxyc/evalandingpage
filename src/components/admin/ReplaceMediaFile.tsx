'use client'

import React, { useState, useCallback, useRef } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const ReplaceMediaFile: React.FC = () => {
  const { id } = useDocumentInfo()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleReplace = useCallback(async () => {
    const fileInput = fileInputRef.current
    if (!fileInput?.files?.length) {
      setMessage({ type: 'error', text: 'Bitte wähle eine Datei aus' })
      return
    }

    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append('id', String(id))
    formData.append('file', file)

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/media/replace', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Ersetzen')
      }

      setMessage({ type: 'success', text: 'Datei erfolgreich ersetzt!' })
      fileInput.value = ''
      setTimeout(() => window.location.reload(), 1500)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }, [id])

  if (!id) return null

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: 'var(--theme-elevation-800, #1a1a1a)',
        }}
      >
        Datei ersetzen
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={loading}
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid var(--theme-elevation-200, #d4d4d4)',
            background: 'var(--theme-elevation-50, #fafafa)',
            fontSize: '0.875rem',
          }}
        />
        <button
          onClick={handleReplace}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            background: loading ? 'var(--theme-elevation-200, #d4d4d4)' : 'var(--theme-elevation-950, #111)',
            color: loading ? 'var(--theme-elevation-500, #888)' : 'var(--theme-elevation-50, #fafafa)',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Wird ersetzt...' : 'Ersetzen'}
        </button>
      </div>
      {message && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: message.type === 'success' ? '#e6f7e6' : '#fde8e8',
            color: message.type === 'success' ? '#2d7d2d' : '#c41e3a',
            fontSize: '0.875rem',
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  )
 }

