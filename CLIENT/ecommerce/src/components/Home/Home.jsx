import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async (p = page, l = limit) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/show-products?page=${p}&limit=${l}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

      setProducts(Array.isArray(res.data.Products) ? res.data.Products : []);
      setPage(Number(res.data.page) || p);
      setLimit(Number(res.data.limit) || l);
      setTotalPages(Number(res.data.totalPages) || 1);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, limit);
  }, [page, limit]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10) || 6;

    setLimit(newLimit);
    setPage(1);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20">
        <Navbar />
      </header>

      <main className="flex-1 p-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Products</h1>

          <div className="flex items-center gap-3">
            <label className="text-sm">Per page:</label>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border rounded px-2 py-1"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {loading && <div className="text-center py-8">Loading products...</div>}

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No products found.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <article
              key={p._id || p.id}
              className="border rounded p-4 shadow-sm"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center mb-3">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.productName}
                    className="object-contain h-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">No image</span>
                )}
              </div>

              <h2 className="font-medium text-lg">
                {p.productName || "Untitled Product"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {p.description?.slice(0, 80) || ""}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-semibold">
                  {p.price ? `₹${p.price}` : "—"}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/product-details/${p._id || p.id}`)
                    }
                    className="px-3 py-1 bg-yellow-400 text-black rounded text-sm"
                  >
                    View
                  </button>

                
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <button
              onClick={handlePrev}
              disabled={page <= 1 || loading}
              className="px-3 py-1 mr-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              onClick={handleNext}
              disabled={page >= totalPages || loading}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </div>
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
