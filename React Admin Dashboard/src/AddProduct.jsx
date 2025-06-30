import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddProduct() {
  const [product, setProduct] = useState({
    productname: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


const handleSubmit = (e) => {
  e.preventDefault();

  axios.post('http://localhost:7000/products', product)
    .then(result => {
      console.log(result);
      toast.success("Product added successfully!");
      setProduct({
        productname: "",
        category: "",
        price: "",
        description: "",
        image: ""
      });
    })
    .catch(err => {
      console.error(err);
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
            />
          </Form.Group>

          <Form.Select
            className="custom-select-dark"
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
            Add Product
          </Button>
        </Form>
      </Container>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />

    </div>
  );
}

export default AddProduct;
