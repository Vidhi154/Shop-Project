import React from 'react'
import { useState } from 'react'
export default function Header({ onsubmit }) {
    const [value , setValue] = useState('')

    const handleSearch = () => {
        const text = value.trim()
        if(!text) return
        if(onsubmit) onsubmit(text)
         setValue('')
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '20px 40px',
        background: 'linear-gradient(180deg, #f7f3ef 0%, #f2ece7 100%)',
        borderBottom: '1px solid rgba(92, 73, 52, 0.12)',
        boxShadow: '0 6px 18px rgba(58, 42, 29, 0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #8a6b4d, #d8c2a3)',
            borderRadius: '50%',
            boxShadow: '0 0 0 4px rgba(138, 107, 77, 0.12)',
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            letterSpacing: '0.12em',
            color: '#1a1a1a',
            textTransform: 'uppercase',
          }}
        >
          Vmart
        </p>
      </div>

      <div
        style={{
          flex: 1,
          maxWidth: '500px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(92, 73, 52, 0.12)',
          borderRadius: '999px',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <input
        value = {value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
          placeholder="Search for essentials..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '14px 18px',
            fontSize: '0.98rem',
            color: '#2f2f2f',
          }}
        />
        <button
        onClick={handleSearch}
          style={{
            border: 'none',
            
            background: 'linear-gradient(135deg, #1d1d1d, #4a3d32)',
            color: '#fff',
            padding: '14px 22px',
            cursor: 'pointer',
            fontWeight: '600',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Go
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          style={{
            border: '1px solid rgba(92, 73, 52, 0.18)',
            backgroundColor: 'transparent',
            color: '#1f1f1f',
            padding: '12px 18px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: '600',
            letterSpacing: '0.04em',
          }}
        >
          Orders
        </button>
        <button
          style={{
            border: '1px solid rgba(92, 73, 52, 0.18)',
            backgroundColor: '#171513',
            color: '#f8f4f1',
            padding: '12px 20px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: '700',
            letterSpacing: '0.04em',
            

          }}
        >
          Cart
        </button>
      </div>
    </div>
  )
}
