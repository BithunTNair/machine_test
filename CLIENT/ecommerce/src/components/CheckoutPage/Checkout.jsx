import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { successToast } from "../../Plugins/toast";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const navigate= useNavigate();
  const { cartId } = useParams();
  const handlePlaceOrder = async () => {
    if (!user || !user.user || !user.user._id) {
      return alert("Please login to place an order.");
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/orders/create-order/${cartId}`
      );

      successToast("Order has been placed successfully");
      navigate('/success-page')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded border p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
               
                <h2 className="text-lg font-medium text-red-600">
                  Choose a payment method
                </h2>
              </div>
              <button className="text-sm text-gray-500 hover:underline">
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <div className="bg-gray-50 p-4 rounded border">
                  <label className="block text-sm font-medium mb-2">
                    Enter a gift code or promotional code
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      placeholder="Enter code"
                    />
                    <button className="px-3 py-2 bg-white border rounded text-sm">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm text-gray-700 mb-2">
                    Add a credit or debit card
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gray-200 rounded" />
                    <button className="text-sm text-blue-600 hover:underline">
                      Add a credit or debit card
                    </button>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Buy Now, Pay Later
                  </h3>
                 
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Other payment options
                  </h3>
                  <label className="flex items-center gap-3 text-sm">
                    <input type="radio" name="otherpay" />
                    <div>Cash on Delivery (COD)</div>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white rounded border p-6 shadow-sm">
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-yellow-400 text-black font-semibold rounded text-lg"
            >
              Place Order
            </button>
          </div>
        </section>

       
      </main>
    </div>
  );
};

export default Checkout;
