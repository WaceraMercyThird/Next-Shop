/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/navbar";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar searchQuery="" setSearchQuery={() => {}} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-700 text-lg text-center mt-20">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.author}</p>
                    <p className="text-gray-900 font-medium mt-2 text-lg">${item.price.toFixed(2)}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                      >
                        -
                      </button>
                      <span className="text-gray-900 font-medium text-lg">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="mt-6 w-full bg-gray-200 text-gray-900 py-3 rounded-xl shadow hover:bg-gray-300 transition font-semibold"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Order Summary</h2>

              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-3 text-gray-800 font-medium">
                  <span>{item.title} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr className="my-4 border-gray-300" />

              <div className="flex justify-between mb-2 text-gray-900 font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2 text-gray-900 font-medium">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4 text-gray-900 font-medium">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <hr className="mb-4 border-gray-300" />

              <div className="flex justify-between text-xl font-extrabold text-gray-900 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <input
                type="text"
                placeholder="Promo code"
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium shadow-sm"
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg">
                Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
