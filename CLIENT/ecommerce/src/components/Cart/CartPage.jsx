import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId,setCartId] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/cart/get-your-cart/${
            user.user._id
          }`
        );
        setCartItems(response.data.cart.products);
        setCartId(response.data.cart._id)
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    if (user.user._id) {
      fetchCart();
    }
  }, [user.user._id]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/cart/update-quantity/${
          user.user._id
        }`,
        { productId, quantity }
      );
      setCartItems(response.data.cart.products);
    } catch (err) {
      console.error(err);
      setError("Failed to update quantity");
    }
  };


  if (loading) {
    return <div className="text-center p-6">Loading your cart...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12 pt-6">
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center text-gray-600">
            <p className="text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white rounded shadow-sm border flex flex-col md:flex-row overflow-hidden"
                >
                  <div className="flex-shrink-0 p-4 bg-gray-50 flex items-center justify-center w-full md:w-48">
                    <img
                      src={item.productId.image || PLACEHOLDER}
                      alt={item.productId.productName}
                      className="object-contain h-32 w-32"
                    />
                  </div>

                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {item.productId.productName}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.productId.category || "Uncategorized"}
                      </p>

                      <div className="mt-3 text-sm text-gray-700 line-clamp-2">
                        {item.productId.description
                          ? item.productId.description
                          : ""}
                      </div>
                    </div>

                    <div className="mt-4 md:mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.productId._id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="px-3 py-2 text-sm md:text-base disabled:opacity-50"
                          >
                            −
                          </button>
                          <div className="px-4 py-2 text-sm md:text-base bg-white">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.productId._id,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-2 text-sm md:text-base"
                          >
                            +
                          </button>
                        </div>

                      </div>

                      <div className="text-right">
                        <div className="text-gray-500 text-sm line-through">
                          {item.productId.mrp ? `₹${item.productId.mrp}` : ""}
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          ₹{item.productId.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600 mt-1">
                          In stock
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white p-4 rounded shadow md:hidden">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </div>
                  <div className="text-lg font-semibold">
                    ₹{calculateTotal().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <aside className="relative">
              <div className="sticky top-6">
                <div className="bg-white p-5 rounded shadow border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-600">
                        Subtotal ({cartItems.length} item)
                      </div>
                      <div className="text-2xl font-bold">
                        ₹{calculateTotal().toLocaleString()}
                      </div>
                    </div>
                   
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 bg-yellow-400 text-black rounded text-lg font-semibold"
                      onClick={()=>navigate(`/checkout-page/${cartId}`)} >
                      Proceed to Buy
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
