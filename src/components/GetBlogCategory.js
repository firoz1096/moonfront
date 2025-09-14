import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export default function GetBlogCategory({
  multiple = false,
  onSelect,
  apiUrl,
  selected = [],
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setCategories(res.data.categories || []))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  if (loading) return <p>Loading categories...</p>;

  const options = categories.map((cat) => ({ value: cat._id, label: cat.name }));
  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  return (
    <Select
      options={options}
      isMulti={multiple}
      value={selectedOptions}
      onChange={(opts) => {
        if (multiple) onSelect(opts.map((o) => o.value));
        else onSelect(opts ? opts.value : null);
      }}
      placeholder={multiple ? "Select categories..." : "Select a category..."}
    />
  );
}
