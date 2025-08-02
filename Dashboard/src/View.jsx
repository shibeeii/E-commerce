import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
function View() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="main-container">Loading...</div>;

  return (
    <div className="main-container w-100 d-flex align-items-center justify-content-center">
      <div>
          <h2 className='text-center'>{product.productname}</h2>
          <img src={product.image} alt={product.productname} width="300" />
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <div className='text-center'><Link to={'/products'}><button className='btn btn-warning '>Back</button></Link></div>
      </div>
    </div>
  );
}

export default View;
