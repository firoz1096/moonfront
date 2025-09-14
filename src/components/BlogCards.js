import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BlogCards() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading blogs...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {/* Cover Image */}
              {blog.coverImage && (
                <img
                  src={`http://localhost:5000${blog.coverImage}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              {/* Card Body */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                {/* <p className="card-text text-muted small">
                  {blog.location?.city}, {blog.location?.country}
                </p> */}
                <p className="card-text">
                  {blog.excerpt
                    ? blog.excerpt
                    : blog.content.replace(/<[^>]+>/g, "").substring(0, 100) + "..."}
                </p>

                <div className="mt-auto">
                  {/* Categories */}
                  <div className="position-absolute top-0 end-0 p-2">
                    {blog.categories?.map((cat) => (
                      <span
                        key={cat._id}
                        className="badge bg-primary me-1"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>

                  {/* Read More button */}
                  <a href={`/blog/${blog.slug}`} className="btn btn-sm btn-outline-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="col-12 text-center">
            <p>No blogs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
