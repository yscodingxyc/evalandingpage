'use client'

import React, { useState, useRef } from 'react'
import { useUploadControls } from '@payloadcms/ui'
import { compressImageFile } from '@/lib/compressImageClient'

export const CompressibleUploadControls: React.FC = () => {
  const { setUploadControlFile, setUploadControlFileName } = useUploadControls()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setLoading(true)
    setMessage(null)
    try {
      const compressed = await compressImageFile(file)
      setUploadControlFile(compressed)
      setUploadControlFileName(compressed.name)
      if (compressed !== file) {
        setMessage({
          type: 'success',
          text: `Bild automatisch komprimiert (${(file.size / 1e6).toFixed(2)} MB → ${(compressed.size / 1e6).toFixed(2)} MB). Upload wird gestartet...`,
        })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Fehler bei der Komprimierung' })
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) void handleFile(f)
        }}
      />
      <button
        type="button"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        style={{
          padding: '0.35rem 0.75rem',
          borderRadius: '4px',
          border: 'none',
          background: loading ? 'var(--theme-elevation-200, #d4d4d4)' : 'var(--theme-elevation-950, #111)',
          color: loading ? 'var(--theme-elevation-500, #888)' : 'var(--theme-elevation-50, #fafafa)',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '0.8125rem',
        }}
      >
        {loading ? 'Komprimiere...' : 'Komprimiert hochladen'}
      </button>
      {message && (
        <span
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: message.type === 'success' ? '#e6f7e6' : '#fde8e8',
            color: message.type === 'success' ? '#2d7d2d' : '#c41e3a',
            fontSize: '0.8125rem',
          }}
        >
          {message.text}
        </span>
      )}
    </div>
  )
}
