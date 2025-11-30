import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categoryImg, setCategoryImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryDesc || !categoryImg || !categoryId) {
      alert("Please fill all fields and select an image");
      return;
    }

    // const formData = new FormData();
    // formData.append("categoryName", categoryName);
    // formData.append("categoryDesc", categoryDesc);
    // formData.append("imageUrl", 'asdf');
    const formData = {
        categoryName: categoryName, 
        categoryDesc: categoryDesc,
        imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg',
        categoryId: categoryId
    }

    try {
      const response = await axios.post("http://localhost:5500/api/admin/categories/add", formData, {
      });

      alert("Product added successfully!");
      console.log(response.data);
      setCategoryName("");
      setCategoryDesc("");
      setCategoryImg(null);
      setCategoryId('')
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Categories</h1>
      <form onSubmit={handleSubmit}>
<input
  type="text"
  placeholder="Category ID(- instead of white space)"
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
  required
  pattern="^[A-Za-z]+(-[A-Za-z]+)*$"
  title="Category ID must contain only letters (a-z) and hyphens. No spaces or numbers."
  style={{ display: "block", marginBottom: "10px", width: "95vw" }}
/>

        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "95vw" }}
        />
        <textarea
          placeholder="Category Description"
          value={categoryDesc}
          onChange={(e) => setCategoryDesc(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "95vw", height: "100px" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCategoryImg(e.target.files[0])}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Home;
