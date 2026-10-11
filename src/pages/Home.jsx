import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase()
    if (!query) return true

    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  })

  return (
    <>
      <Header onsubmit={setSearch} />

      <div style={{ padding: '32px 24px', background: '#f9f7f4' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#555' }}>Loading products...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: '#b00020' }}>{error}</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >

            {filteredProducts.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#555' }}>
                No products found.
              </p>
            )}
            {(filteredProducts.length > 0 ? filteredProducts : products ).map((product) => (
              <Card key={product.id} product={product} />
            ))}
            {/* {filteredProducts.length > 0 ? ( */}
           
            {/* ) : ( */}
              
            {/* )} */}
          </div>
        )}
      </div>
    </>
  )
}
