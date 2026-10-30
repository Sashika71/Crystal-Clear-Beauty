import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from "../../components/Loaded";
import ImagesSlider from '../../components/ImageSlider';

import getCart, { addToCart } from "../../../Utils/Cart.js";







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
        setProduct(res.data.product);
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

      {status === "loaded" && 
        <div className="w-full h-full flex">
            <div className='w-[50%] h-full'>
              <ImagesSlider images={product.images}/>  

            </div>
            <div className='w-[50%] h-full p-6 flex flex-col gap-4'>
  <h1 className="text-3xl font-bold">{product.name}
    {" | "}
							<span className="text-2xl mr-[20px] text-gray-500">
								{product.altName.join(" | ")}
							</span>
  </h1>

  {product.alt && (
    <p className="text-gray-600">{product.alt}</p>
  )}

 

  <div className="w-full flex flex-col gap-3 mb-6">
    {product.labledPrice > product.price ? (
      <>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-slate-900">
            LKR {product.price.toFixed(2)}
          </h2>
          <h2 className="text-2xl line-through text-slate-400">
            LKR {product.labledPrice.toFixed(2)}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            💰 Save LKR {(product.labledPrice - product.price).toFixed(2)}
          </span>
          <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            {Math.round(((product.labledPrice - product.price) / product.labledPrice) * 100)}% OFF
          </span>
        </div>
      </>
    ) : (
      <h2 className="text-3xl font-bold text-slate-900">
        LKR {product.price.toFixed(2)}
      </h2>
    )}
  </div>


  {/* DESCRIPTION */}
  <p className="text-gray-700 leading-relaxed">
    {product.description}
  </p>

  {/* BUTTONS */}
  <div className="flex gap-4 mt-4">
    <button className="bg-pink-800 border cursor-pointer border-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800 transition-all duration-300 ease-in-out"onClick={
      ()=>{
          // console.log(product);
        addToCart(product,1)
        toast.success("product added to cart")
        // console.log(getCart());
      }
    }>
      Add to Cart
    </button>
  


   <button
								onClick={() => {
									navigate("/checkout", {
										state: {
											items: [
												{
													productId: product.productId,
													name: product.name,
													altNames: product.altName,
													price: product.price,
													labeledPrice: product.labledPrice,
													image: product.images[0],
													quantity: 1,
												},
											],
										},
									});
								}}
								className="bg-pink-800 border cursor-pointer border-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800 transition-all duration-300 ease-in-out ml-[20px]"
							>
								Buy Now
                 
							</button>
  </div>
</div>

        </div>
      }

      {status === "error" && <div className="text-red-500">Error loading product</div>}
    </div>
  );
}
