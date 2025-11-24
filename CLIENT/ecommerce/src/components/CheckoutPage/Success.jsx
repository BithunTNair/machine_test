import React from 'react'
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-green-600 mb-2">
          Congratulations!
        </h1>

        <p className="text-gray-700 text-lg">
          Your order has been placed successfully.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Thank you for shopping with us. You can track your order anytime.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/your-orders")}
            className="w-full py-3 bg-yellow-400 rounded font-medium"
          >
            View Your Orders
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 bg-gray-200 rounded font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success
