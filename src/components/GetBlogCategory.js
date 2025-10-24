import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function GetBlogCategory({
  multiple = false,
  onSelect,
  selected = [],
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/categories`);
        setCategories(res.data.categories || res.data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  const options = categories.map((cat) => ({ value: cat._id, label: cat.name }));

  // Map selected IDs to option objects for controlled component
  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  return (
    <Select
      options={options}
      isMulti={multiple}
      value={selectedOptions}
      onChange={(opts) => {
        if (multiple) {
          onSelect(Array.isArray(opts) ? opts.map((o) => o.value) : []);
        } else {
          onSelect(opts ? opts.value : null);
        }
      }}
      placeholder={multiple ? "Select categories..." : "Select a category..."}
    />
  );
}
