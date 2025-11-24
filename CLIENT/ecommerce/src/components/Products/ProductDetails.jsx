import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Home/Navbar";
import Footer from "../Footer/Footer";
import { errorToast, successToast } from "../../Plugins/toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/product-details/${id}`
        );
        setProduct(res.data.product || res.data);
        console.log(user);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    console.log(user.user._id);
    console.log(product._id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/cart/add-to-cart/${
          user.user._id
        }`,
        {
          productId: product._id || product.id,
          quantity: 1,
        }
      );

      if (response.status === 200 || response.status === 201) {
        successToast(response.data.message);
      } else {
        errorToast("Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6 max-w-6xl mx-auto">Loading...</main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6 max-w-6xl mx-auto text-red-600">
          {error}
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6 max-w-6xl mx-auto">No product found.</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-20 bg-white">
        <Navbar />
      </header>

      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded p-4">
            {product.image ||
            (Array.isArray(product.images) && product.images[0]) ? (
              <img
                src={product.image || product.images[0]}
                alt={product.productName || product.name || "Product"}
                className="max-h-80 object-contain"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center text-sm text-gray-500">
                No image
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">
                {product.productName || product.name || "Untitled"}
              </h1>
              <div className="text-xl font-bold text-gray-900 mb-2">
                {product.price ? `₹${product.price}` : "—"}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {product.category || "Uncategorized"}
              </div>
              <p className="text-gray-700 mb-4">{product.description || ""}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="px-4 py-2 bg-yellow-400 text-black rounded font-medium disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review._id} className="border rounded p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">
                      User Name: {review.userId}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      ({review.rating})
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{review.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">No reviews yet.</div>
          )}
        </section>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default ProductDetails;
