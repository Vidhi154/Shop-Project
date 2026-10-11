import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError('')
        setLoading(true)

        const res = await fetch(`http://localhost:5000/api/products/${id}`)

        if (!res.ok) {
          throw new Error('Product not found')
        }

        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading product...</p>
  if (error) return <p style={{ padding: '40px', textAlign: 'center', color: '#b00020' }}>{error}</p>
  if (!product) return <p style={{ padding: '40px', textAlign: 'center' }}>Product not found.</p>

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8f5f1 0%, #f1eee9 100%)',
        padding: '40px 24px',
        color: '#1e1e1e',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 18px 60px rgba(31, 24, 18, 0.08)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '0',
        }}
      >
        <div
          style={{
            background: '#f3efe9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: '100%',
              maxWidth: '430px',
              objectFit: 'contain',
              borderRadius: '20px',
              background: '#fff',
              padding: '24px',
            }}
          />
        </div>

        <div style={{ padding: '48px 40px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.8rem',
              color: '#8a6b4d',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {product.category}
          </p>

          <h1
            style={{
              margin: '16px 0',
              fontSize: '2.4rem',
              lineHeight: 1.1,
              fontWeight: 700,
            }}
          >
            {product.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.2rem', color: '#c28d49', fontWeight: 700 }}>
              ★ {product.rating ?? '4.8'}
            </span>
            <span style={{ color: '#666', fontSize: '0.95rem' }}>
              {product.stock ?? 20} in stock
            </span>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1b1b1b' }}>
              ₹{Number(product.price).toFixed(2)}
            </span>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#444', marginBottom: '28px' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <button
              onClick={() => alert("We'll implement the cart next!")}
              style={{
                border: 'none',
                background: 'linear-gradient(135deg, #1f1f1f, #3a2a20)',
                color: '#fff',
                padding: '16px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>

            <button
              style={{
                border: '1px solid #d9d0c6',
                background: '#fff',
                color: '#1e1e1e',
                padding: '16px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Buy Now
            </button>
          </div>

          <div
            style={{
              borderTop: '1px solid #eee',
              paddingTop: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '16px',
            }}
          >
            {[
              ['Free Shipping', 'On orders over ₹2,000'],
              ['Easy Returns', '30-day return policy'],
              ['Secure Payment', '100% protected checkout'],
            ].map(([title, text]) => (
              <div key={title}>
                <p style={{ margin: 0, fontWeight: 700, color: '#1d1d1d' }}>{title}</p>
                <p style={{ margin: '8px 0 0', color: '#666', fontSize: '0.9rem' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
