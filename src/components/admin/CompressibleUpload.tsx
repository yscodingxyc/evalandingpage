'use client'

import React, { useState, useRef } from 'react'
import { useField, useForm } from '@payloadcms/ui'
import { compressImageFile } from '@/lib/compressImageClient'

export const CompressibleUpload: React.FC = () => {
  const { value, setValue, showError } = useField<any>({ path: 'file' })
  const { setModified } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasFile = Boolean(value)

  const applyFile = async (file: File) => {
    setLoading(true)
    setError(null)
    try {
      const compressed = await compressImageFile(file)
      setValue(compressed)
      setModified(true)
      setPreview(URL.createObjectURL(compressed))
      if (inputRef.current) inputRef.current.value = ''
    } catch (err: any) {
      setError(err.message || 'Fehler bei der Komprimierung')
    } finally {
      setLoading(false)
      setDragging(false)
    }
  }

  const removeFile = () => {
    setValue(null)
    setPreview(null)
    setModified(true)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleFiles = (fileList: FileList | null) => {
    const file = fileList?.[0]
    if (file) void applyFile(file)
  }

  const dropzoneStyle: React.CSSProperties = {
    border: `2px dashed ${dragging ? 'var(--theme-elevation-400, #999)' : 'var(--theme-elevation-200, #d4d4d4)'}`,
    borderRadius: '8px',
    padding: '2rem 1rem',
    textAlign: 'center',
    cursor: 'pointer',
    background: 'var(--theme-elevation-50, #fafafa)',
    transition: 'border-color 0.2s',
  }

  return (
    <div className="upload" style={{ marginBottom: '1.5rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: 'var(--theme-elevation-800, #1a1a1a)',
        }}
      >
        Datei
      </label>

      {hasFile ? (
        <div style={dropzoneStyle}>
          {preview && (
            <div style={{ marginBottom: '0.75rem' }}>
              <img
                src={preview}
                alt="Vorschau"
                style={{ maxWidth: '240px', maxHeight: '160px', borderRadius: '6px', objectFit: 'cover' }}
              />
            </div>
          )}
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: 'var(--theme-elevation-600, #666)' }}>
            {typeof value === 'string' ? value : value?.name || 'Datei ausgewählt'}
          </p>
          <button
            type="button"
            onClick={removeFile}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '4px',
              border: 'none',
              background: 'var(--theme-elevation-200, #d4d4d4)',
              color: 'var(--theme-elevation-800, #1a1a1a)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8125rem',
            }}
          >
            Datei entfernen
          </button>
        </div>
      ) : (
        <div
          style={dropzoneStyle}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
        >
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--theme-elevation-600, #666)' }}>
            {loading ? 'Bild wird komprimiert...' : 'Klicken oder Datei hierher ziehen'}
          </p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--theme-elevation-400, #aaa)' }}>
            Große Bilder werden automatisch komprimiert
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={loading}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: '#fde8e8',
            color: '#c41e3a',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}
      {showError && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '4px',
            backgroundColor: '#fde8e8',
            color: '#c41e3a',
            fontSize: '0.875rem',
          }}
        >
          Bitte wähle eine Datei aus
        </div>
      )}
    </div>
  )
}
