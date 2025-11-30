import axios from "axios";
import { useState } from "react";

function Products() {
  const [ProductId, setProductId] = useState("");
  const [ProductName, setProductName] = useState("");
  const [ProductDesc, setProductDesc] = useState("");
  const [ProductImg, setProductImg] = useState(null);
  const [productPrice, setPRoductPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ProductName || !ProductDesc || !ProductImg || !ProductId) {
      alert("Please fill all fields and select an image");
      return;
    }

    // const formData = new FormData();
    // formData.append("ProductName", ProductName);
    // formData.append("ProductDesc", ProductDesc);
    // formData.append("imageUrl", 'asdf');
    const formData = {
        productName: ProductName, 
        productDesc: ProductDesc,
        imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg',
        productId: ProductId,
        productPrice: productPrice,
        discountPrice: discountPrice
    }

    try {
      const response = await axios.post("http://localhost:5500/api/admin/products/add", formData, {
      });

      alert("Product added successfully!");
      console.log(response.data);
      setProductName("");
      setProductDesc("");
      setProductImg(null);
      setProductId('')
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
<input
  type="text"
  placeholder="Category ID(- instead of white space)"
  value={ProductId}
  onChange={(e) => setProductId(e.target.value)}
  required
  pattern="^[A-Za-z]+(-[A-Za-z]+)*$"
  title="Category ID must contain only letters (a-z) and hyphens. No spaces or numbers."
  style={{ display: "block", marginBottom: "10px", width: "95vw" }}
/>

        <input
          type="text"
          placeholder="Category Name"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "95vw" }}
        />
        <textarea
          placeholder="Category Description"
          value={ProductDesc}
          onChange={(e) => setProductDesc(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "95vw", height: "100px" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProductImg(e.target.files[0])}
          required
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setPRoductPrice(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "95vw" }}
        />
        <input
          type="text"
          placeholder="Discount Price"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "95vw" }}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Products