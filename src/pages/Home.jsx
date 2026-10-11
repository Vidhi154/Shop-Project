import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


    const [category, setCategory] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");
    const [categories, setCategories] = useState([]);

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

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (category !== "all") {
        params.set("category", category);
      }

      if (minPrice !== "") {
        params.set("minPrice", minPrice);
      }

      if (maxPrice !== "") {
        params.set("maxPrice", maxPrice);
      }

      if (sort) {
        params.set("sort", sort);
      }

      const res = await fetch(
        `http://localhost:5000/api/products?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [search, category, minPrice, maxPrice, sort]);

  useEffect(()=>{
    const fetchCategory = async () => {
        try{
             const res = await fetch(
                "http://localhost:5000/api/categories"
            );

            if (!res.ok) {
                throw new Error("Failed to fetch categories");
            }

        const data = await res.json();
        setCategories(data);
        } catch (err) {
        console.error(err);
        }
    };
    fetchCategory();
  },[]);
  
// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const params = new URLSearchParams();

//       if (search.trim()) {
//         params.set("search", search.trim());
//       }

//       const url = `http://localhost:5000/api/products?${params.toString()}`;

//       const res = await fetch(url);

//       if (!res.ok) {
//         throw new Error("Failed to fetch products");
//       }

//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, [search]);


//   const filteredProducts = products.filter((product) => {
//     const query = search.trim().toLowerCase()
//     if (!query) return true

//     return (
//       product.title.toLowerCase().includes(query) ||
//       product.category.toLowerCase().includes(query)
//     )
//   })

  return (
    <>
      <Header onsubmit={setSearch} />

      
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", padding: "20px" }}>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
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
    onChange={(e) => setMinPrice(e.target.value)}
  />

  <input
    type="number"
    min="0"
    placeholder="Maximum price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
  />

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
  >
    <option value="">Default sorting</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
  </select>

  <button
    onClick={() => {
      setCategory("all");
      setMinPrice("");
      setMaxPrice("");
      setSort("");
      setSearch("");
    }}
  >
    Clear filters
  </button>
</div>


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

            {products.map((product) =>(
                <Card key={product.id} product={product} />
            ))}

            {/* {filteredProducts.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#555' }}>
                No products found.
              </p>
            )}
            {(filteredProducts.length > 0 ? filteredProducts : products ).map((product) => (
              <Card key={product.id} product={product} />
            ))} */}
            {/* {filteredProducts.length > 0 ? ( */}
           
            {/* ) : ( */}
              
            {/* )} */}
          </div>
        )}
      </div>
    </>
  )
}
