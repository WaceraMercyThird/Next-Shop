// lib/books.ts

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  tags: string[];
  description: string;
};

export const books: Book[] = [
  {
    id: "1",
    title: "Mastering TypeScript",
    author: "John Doe",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1581092795360-ff1a6c0d8d5b?auto=format&fit=crop&w=400&q=80",
    tags: ["typescript", "frontend", "programming"],
    description:
      "A complete guide to mastering TypeScript for building scalable web applications.",
  },
  {
    id: "2",
    title: "Next.js in Action",
    author: "Jane Smith",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1581093588401-1d1f5b1a3c4b?auto=format&fit=crop&w=400&q=80",
    tags: ["nextjs", "react", "frontend"],
    description:
      "Learn how to build fast, scalable, and SEO-friendly web apps using Next.js.",
  },
  {
    id: "3",
    title: "React Patterns",
    author: "Alice Johnson",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1581093588401-1d1f5b1a3c4b?auto=format&fit=crop&w=400&q=80",
    tags: ["react", "frontend", "patterns"],
    description:
      "Explore modern React patterns and best practices for building robust applications.",
  },
  {
    id: "4",
    title: "Design for Developers",
    author: "Mark Wilson",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80",
    tags: ["design", "frontend", "ux"],
    description:
      "Learn design fundamentals for building visually appealing interfaces.",
  },
  {
    id: "5",
    title: "Backend with Node.js",
    author: "Sophia Lee",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1e?auto=format&fit=crop&w=400&q=80",
    tags: ["backend", "nodejs", "javascript"],
    description:
      "Build robust backend applications with Node.js and Express.",
  },
  {
    id: "6",
    title: "Productivity Hacks",
    author: "Emma Brown",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    tags: ["productivity", "self-help", "career"],
    description:
      "Boost your productivity with these actionable strategies.",
  },
];
