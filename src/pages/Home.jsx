import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(8)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const params = new URLSearchParams()

        if (search.trim()) {
          params.set('search', search.trim())
        }

        if (category !== 'all') {
          params.set('category', category)
        }

        if (minPrice !== '') {
          params.set('minPrice', minPrice)
        }

        if (maxPrice !== '') {
          params.set('maxPrice', maxPrice)
        }

        if (sort === 'price_asc') {
          params.set('sortBy', 'price')
          params.set('sortOrder', 'asc')
        } else if (sort === 'price_desc') {
          params.set('sortBy', 'price')
          params.set('sortOrder', 'desc')
        }

        params.set('page', String(page))
        params.set('limit', String(limit))

        const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`)

        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await res.json()
        setProducts(data.products || [])
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, category, minPrice, maxPrice, sort, page, limit])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories')

        if (!res.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCategory()
  }, [])

  const resetFilters = () => {
    setCategory('all')
    setMinPrice('')
    setMaxPrice('')
    setSort('')
    setSearch('')
    setPage(1)
  }

  return (
    <>
      <Header onsubmit={setSearch} />

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '20px' }}>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }}>
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) => { setMinPrice(e.target.value); setPage(1) }}
        />

        <input
          type="number"
          min="0"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) => { setMaxPrice(e.target.value); setPage(1) }}
        />

        <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }}>
          <option value="">Default sorting</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <button onClick={resetFilters}>Clear filters</button>
      </div>

      <div style={{ padding: '32px 24px', background: '#f9f7f4' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#555' }}>Loading products...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: '#b00020' }}>{error}</p>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
            >
              {products.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
              <button disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  style={{
                    fontWeight: page === num ? '700' : '400',
                    background: page === num ? '#171513' : '#fff',
                    color: page === num ? '#fff' : '#171513',
                    border: '1px solid #ddd',
                    padding: '8px 12px',
                    borderRadius: '6px',
                  }}
                >
                  {num}
                </button>
              ))}

              <button disabled={page >= totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
