import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from "../../components/Loaded";

export default function ProductOverview() {

  // ⭐ Get the correct param from route
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  // ⭐ Safe redirect if no productId
  useEffect(() => {
    if (!productId) {
      navigate("/products");
    }
  }, [productId, navigate]);

  // ⭐ Fetch product data
  useEffect(() => {
    if (!productId) return; // prevent undefined API call

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("loaded");
      })
      .catch(() => {
        toast.error("Product is not available");
        setStatus("error");
      });
  }, [productId]);

  return (
    <div className="w-full h-full p-4">
      {status === "loading" && <Loader />}

      {status === "loaded" && product && (
        <div className="w-full h-full">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p>{product.description}</p>
          <p className="mt-2 font-semibold">Price: ${product.price}</p>
          {/* Add more product details here */}
        </div>
      )}

      {status === "error" && <div className="text-red-500">Error loading product</div>}
    </div>
  );
}
