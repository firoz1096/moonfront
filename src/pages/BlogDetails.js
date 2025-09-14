import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "../auth/AuthContext";

export default function BlogDetails() {

const { user } = useAuth(); // from AuthProvider
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/slug/${slug}`);
        if (res.data.success) {
          setBlog(res.data.blog);

          // fetch related blogs using categories
          if (res.data.blog.categories?.length > 0) {
            const categoryIds = res.data.blog.categories.map((cat) => cat._id);
            const relatedRes = await axios.get(
              `http://localhost:5000/api/blogs?categories=${categoryIds.join(",")}`
            );
            if (relatedRes.data.success) {
              // exclude the current blog from related
              const filtered = relatedRes.data.blogs.filter((b) => b.slug !== slug);
              setRelatedBlogs(filtered.slice(0, 3)); // show max 3
            }
          }
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-5">Loading blog...</div>;
  }

  if (!blog) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">Blog not found</h3>
        <div className="text-center">
          <Link to="/blogs" className="btn btn-outline-primary mt-3">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">

              {user && (
          <div className="text-end mt-4">
<Link
        to={`/blogs/edit/${blog._id}`}
        className="btn btn-warning mt-3"
      >
        Edit Blog
      </Link>
          </div>
        )}




      {/* Blog Title */}
      <h2 className="mb-3">{blog.title}</h2>

      {/* user + Published Date */}
      <p className="text-muted">
       
        {"Admin"}, {format(new Date(blog.createdAt), "MMMM d, yyyy")}
      </p>

      {/* Categories */}
      <div className="mb-3">
        {blog.categories?.map((cat) => (
          <span key={cat._id} className="badge bg-primary me-1">
            {cat.name}
          </span>
        ))}
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <img
          src={`http://localhost:5000${blog.coverImage}`}
          alt={blog.title}
          className="img-fluid rounded"
        />
      )}
      <div className="mb-4"> {blog.location?.city}, {blog.location?.country}</div>

      {/* Blog Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="mt-4">
          <strong>Tags:</strong>{" "}
          {blog.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-1">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="mt-5">
          <h4>Related Posts</h4>
          <div className="row">
            {relatedBlogs.map((related) => (
              <div key={related._id} className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  {related.coverImage && (
                    <img
                      src={`http://localhost:5000${related.coverImage}`}
                      alt={related.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{related.title}</h5>
                    <p className="card-text text-muted">
                      {related.excerpt?.substring(0, 100)}...
                    </p>
                    <Link to={`/blog/${related.slug}`} className="btn btn-sm btn-outline-primary">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-4">
        <Link to="/blogs" className="btn btn-outline-primary">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
