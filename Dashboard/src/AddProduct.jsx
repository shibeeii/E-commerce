import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServerUrl } from "../../front-end/src/assets/Services";

function AddProduct() {
  const [product, setProduct] = useState({
    productname: "",
    category: "",
    price: "",
    offer:"",
    description: "",
    image: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e-commerce");

    setUploading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzbfnf5tz/image/upload",
        formData
      );
      setProduct({ ...product, image: response.data.secure_url });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.image) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    axios
      .post(`${ServerUrl}/products`, product)
      .then((result) => {
        toast.success("Product added successfully!");
        setProduct({
          productname: "",
          category: "",
          price: "",
          offer:"",
          description: "",
          image: "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add product.");
      });
  };

  return (
    <div className="main-container">
      <h2 className="text-center mb-4">Add New Product</h2>
      <Container
        className="p-4"
        style={{
          maxWidth: "600px",
          backgroundColor: "#263043",
          borderRadius: "10px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productname"
              value={product.productname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Select
            className="custom-select-dark mb-3"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Laptop">Laptop</option>

          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
                    <Form.Group className="mb-3">
            <Form.Label className="text-white">offer</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter offer"
              name="offer"
              value={product.offer}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Product Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageUpload}  
 />
          </Form.Group>

          {uploading && <p className="text-white">Uploading image...</p>}
          {product.image && (
            <img
              src={product.image}
              alt="Uploaded preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              className="mb-3"
            />
          )}

          <Button type="submit" variant="primary" className="w-100" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Product"}
          </Button>
        </Form>
      </Container>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
}

export default AddProduct;
