import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GetBlogCategory from "../components/GetBlogCategory"; // updated component
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export default function EditBlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);

        // Adjust based on API structure: either res.data.blog or res.data
        const data = res.data.blog || res.data;

        const categoriesArray = Array.isArray(data.categories)
          ? data.categories.map((cat) => cat._id)
          : [];

        setBlog({
          title: data.title || "",
          content: data.content || "",
          categories: categoriesArray,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategorySelect = (selectedCategories) => {
    setBlog((prev) => ({ ...prev, categories: selectedCategories }));
  };

  // Handle blog update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, blog);
      navigate("/blogs"); // redirect after update
    } catch (err) {
      console.error(err);
      setError("Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading blog details...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Content with JoditEditor */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <JoditEditor
            ref={editor}
            value={blog.content}
            tabIndex={1}
            onBlur={(newContent) =>
              setBlog((prev) => ({ ...prev, content: newContent }))
            }
            config={{
              readonly: false,
              height: 400,
              placeholder: "Enter blog content here...",
            }}
          />
        </div>

        {/* Categories */}
        <div className="mb-3">
          <label className="form-label">Categories</label>
          <GetBlogCategory
            multiple={true}
            onSelect={handleCategorySelect}
            apiUrl="http://localhost:5000/api/categories"
            selected={blog.categories} // pre-select existing categories
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
