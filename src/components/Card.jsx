import React from 'react'

export default function Card({ product }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(30, 20, 10, 0.08)',
        borderRadius: '18px',
        padding: '16px',
        boxShadow: '0 8px 18px rgba(19, 12, 9, 0.04)',
      }}
    >
      <div
        style={{
          background: '#f5f1ed',
          borderRadius: '14px',
          overflow: 'hidden',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '220px',
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '10px',
          }}
        />
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontWeight: '700', color: '#1d1d1d' }}>
          {product.title}
        </p>
        <p style={{ margin: '0 0 8px', color: '#8c6a4d', fontWeight: '700' }}>
          ${Number(product.price).toFixed(2)}
        </p>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>
          {product.description.slice(0, 90)}...

        </p>
        <button style={{ backgroundColor: '#8c6a4d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
          ADD TO CART
        </button>
      </div>
    </div>
  )
}
