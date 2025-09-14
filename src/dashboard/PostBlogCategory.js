import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostBlogCategory() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch categories to check duplicates
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);
    setSlug(input.toLowerCase().trim().replace(/\s+/g, "-"));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if category already exists
    const exists = categories.some(
      (cat) =>
        cat.name.toLowerCase() === name.toLowerCase() ||
        cat.slug.toLowerCase() === slug.toLowerCase()
    );

    if (exists) {
      setMessage("⚠️ Category already exists!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/categories", {
        name,
        slug,
      });
      setMessage("✅ Category created successfully!");
      setCategories([...categories, res.data.category]);
      setName("");
      setSlug("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating category");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
      setMessage("🗑️ Category deleted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting category");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Blog Category</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Category
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}

      {/* List existing categories */}
      <div className="mt-4">
        <h5>Existing Categories</h5>
        <ul className="list-group">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {cat.name} <small className="text-muted">({cat.slug})</small>
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(cat._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
