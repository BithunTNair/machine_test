import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const orders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.user || !user.user._id) {
        setError("Please login to view orders");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/view-orders/${user.user._id}`
        );
        const data = res.data;
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-lg font-medium mb-2">No orders yet</h2>
          <p className="text-sm text-gray-600">
            You haven't placed any orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded shadow-sm border p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    (order.products &&
                      order.products[0] &&
                      order.products[0].productId &&
                      order.products[0].productId.image) ||
                    ""
                  }
                  alt="prod"
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    Order #{order._id}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-semibold">
                  ₹{Number(order.totalPrice || 0).toLocaleString()}
                </div>
                <div className="mt-1">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded ${
                      order.status === "delivered"
                        ? "bg-green-50 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-50 text-blue-700"
                        : order.status === "cancelled"
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {order.status || "placed"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default orders;
