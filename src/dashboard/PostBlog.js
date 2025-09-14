import{ useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";

import UploadImage from "../multer/UploadImage";
import CountryCitySelect from "../components/CountryCitySelect";
import GetBlogCategory from "../components/GetBlogCategory";


export default function PostBlog() {
  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 400,
    toolbarSticky: false,
  };

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    city: "",
    country: "",
    categories: [],
    tags: "",
    isPublished: false,
  });

  const [content, setContent] = useState(""); // Jodit content
  const [errors, setErrors] = useState({}); // Validation errors

  // Helper function to strip HTML tags
  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      title: value,
      slug: value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    });
  };

  // Generic input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleThumbnailUpload = (path) => {
    setFormData({ ...formData, coverImage: path });
  };

  const handleCategorySelect = (selectedIds) => {
    setFormData({ ...formData, categories: selectedIds });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!formData.coverImage) newErrors.coverImage = "Cover Image is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.categories.length)
      newErrors.categories = "Please select at least one category";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop if validation fails

    try {
      // Auto-generate excerpt from content if empty
      const plainTextContent = stripHtml(content);
      const excerpt = formData.excerpt || plainTextContent.substring(0, 200);

      const payload = {
        ...formData,
        content,
        excerpt,
        location: { city: formData.city, country: formData.country },
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
      };

      const res = await axios.post("http://localhost:5000/api/blogs", payload);
      alert("Blog created successfully!");
      console.log(res.data);

      // Reset form
      setFormData({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        coverImage: "",
        city: "",
        country: "",
        categories: [],
        tags: "",
        isPublished: false,
      });
      setContent("");
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Error creating blog!");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={formData.title}
            onChange={handleTitleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Slug */}
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            name="slug"
            className={`form-control ${errors.slug ? "is-invalid" : ""}`}
            value={formData.slug}
            onChange={handleChange}
          />
          {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
        </div>

        {/* Categories */}
        <div className="mb-3">
          <label className="form-label">Select Categories</label>
          <GetBlogCategory
            type="dropdown"
            multiple
            onSelect={handleCategorySelect}
          />
          {errors.categories && (
            <div className="text-danger mt-1">{errors.categories}</div>
          )}
        </div>

        {/* Country & City */}
        <div className="mb-3">
          <CountryCitySelect
            onChange={({ country, city }) =>
              setFormData({ ...formData, country, city })
            }
          />
          {errors.country && <div className="text-danger">{errors.country}</div>}
          {errors.city && <div className="text-danger">{errors.city}</div>}
        </div>

        {/* Excerpt */}
        <div className="mb-3">
          <label className="form-label">Excerpt / Short content</label>
          <input
            type="text"
            name="excerpt"
            className="form-control"
            value={formData.excerpt}
            onChange={handleChange}
          />
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <UploadImage source="Cover Image" onUpload={handleThumbnailUpload} />
          {formData.coverImage && (
            <div className="mt-2">
              <img
                src={`http://localhost:5000${formData.coverImage}`}
                alt="Cover"
                style={{ width: "120px", height: "80px", objectFit: "cover" }}
              />
            </div>
          )}
          {errors.coverImage && (
            <div className="text-danger">{errors.coverImage}</div>
          )}
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
          {errors.content && <div className="text-danger">{errors.content}</div>}
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        {/* Publish Now */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="isPublished"
            className="form-check-input"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <label className="form-check-label">Publish Now?</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
}
