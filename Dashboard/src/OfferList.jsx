import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { IoIosEye } from 'react-icons/io';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';





function Offerlist() {

    const [products, setProducts] = useState([]);


    const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/products`)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
        console.log(products);
    fetchProducts();
  }, []);

  // View button handler
  const handleView = (id) => {
    navigate(`/product/${id}`);
  };
  const handleEdit = (id)=>{
    navigate(`/edit/${id}`)
  }

const handleDelete = (id) => {
axios.delete(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
    .then(() => {
      toast.success("Product deleted successfully!");
      fetchProducts(); 
    })
    .catch((err) => {
      console.error("Delete error:", err);
      toast.error("Failed to delete product.");
    });
};

  return (
    <div className="main-container">
      <h1 className="text-center mb-4">All Products</h1>
            <div className='d-flex justify-content-between p-5'>
              <div className="header-left d-flex align-items-center gap-2">
                <BsSearch className="icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control bg-light text-white border-secondary"
                  style={{ width: "250px", height: "35px" }}
                />
              </div>
  <div>
   <Link to={'/add-product'}> <button className='btn btn-success'>Add Product +</button></Link>
  </div>
            </div>
      <div className="table-wrapper">
        <Table striped bordered hover responsive className="custom-table" width={'100%'}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>offer</th>
              <th>Price</th>
              <th>Image</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {products.filter((i)=>i.offer). map((i,index)=>{
              return(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{i.productname}</td>
              <td>{i.category}</td>
              <td>{i.offer} </td>
              <td>{i.price}</td>
              <td><img src={i.image} alt=""  style={{height:'50px', width:'50px'}}/></td>
              <td><div className="fs-4 d-flex align-items-center justify-content-center gap-1">
                  <button onClick={() => handleView(i._id)} className="btn border-transparent">
                    <IoIosEye  className="text-success"
                    />
                  </button>
                  <button  onClick={() => handleEdit(i._id)} className="btn border-transparent">
                      <MdEdit className="text-primary" />
                  </button>
                  <button onClick={() => handleDelete(i._id)} className="btn border-transparent">
                    <FaTrash className="text-danger" />
                  </button>
                </div></td>
            </tr>

              )
            })}

          </tbody>
        </Table>
      </div>
            <ToastContainer theme="colored" position="top-center" autoClose={2000} />

    </div>
  );
}

export default Offerlist;
