import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productname: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:7000/products/${id}`)
        .then((res) => {

        setProduct(res.data); 
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to load");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:7000/products/${id}`, product)
      .then(() => {
        toast.success("Product updated successfully!");
        setTimeout(() => navigate("/products"), 2000);
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        toast.error("Failed to update product.");
      });
  };

  if (loading) {
    return (
      <div className="text-center text-white mt-5">
        Loading product data...
      </div>
    );
  }

  return (
    <div className="main-container">
      <h2 className="text-center mb-4">Edit Product</h2>
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
            />
          </Form.Group>

          <Form.Select
            className="custom-select-dark mb-3"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">-- Select Category --</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={product.price}
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
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              name="image"
              value={product.image}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Update Product
          </Button>
        </Form>
      </Container>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
}

export default Edit;
