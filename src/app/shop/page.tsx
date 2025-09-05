/* eslint-disable @next/next/no-img-element */
"use client"; 

import { useCart } from "@/context/CartContext";
import { useState, useMemo } from "react";
import Navbar from "@/components/navbar";
import { books, Book } from "@/lib/books";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const allTags = Array.from(new Set(books.flatMap((book) => book.tags)));
  const { addToCart } = useCart();

  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (search) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((book) => book.tags.includes(selectedTag));
    }

    filtered = filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    return filtered;
  }, [search, selectedTag, sortOrder]);

  return (
    <div className="bg-white min-h-screen">
    <Navbar searchQuery={search} setSearchQuery={setSearch} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Devs Book Shop</h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
       
          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-1 rounded-full border transition ${
                selectedTag === null
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1 rounded-full border transition ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book: Book) => (
            <div
              key={book.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{book.author}</p>
                <p className="text-gray-800 font-medium mt-2">${book.price.toFixed(2)}</p>
                <div className="mt-auto">
                  <button onClick={() => addToCart(book)}
                   className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <p className="col-span-full text-gray-500 text-center mt-8">
              No books found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
