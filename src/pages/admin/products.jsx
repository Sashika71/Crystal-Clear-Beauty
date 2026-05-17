import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loaded";


export default function AdminProdutcsPage() {
  const [products, setProducts] = useState([])
  const [loaded,setloaded]=useState(false)
  const navigate=useNavigate()

  useEffect(
    ()=>{
      if(!loaded){
        axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setloaded(true);
      })
      }
    
    },[loaded]
  )

 

async function deleteProduct(id){
     const token=localStorage.getItem("token")
     if(token==null){
           toast.error("please login to dlete a product")
           return;
     }
     
    try{
      
    await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id,{
      headers:{
        Authorization:"Bearer "+token
      } 
     })
     setloaded(false)
     toast.success("Product delted successfully")
    }
    catch(error){
      console.log(error)
      toast.error("product delteion failed")
      return
    }
}


  return (
    <div className="w-full h-full rounded-lg relative p-6 bg-pink-50">
      <Link to={"/admin/addproduct"} className="text-white bg-pink-800 p-3 text-2xl rounded-full cursor-pointer hover:bg-pink-900 absolute right-5 bottom-5 shadow-lg shadow-pink-200 transition">
        <FaPlus />
      </Link>
       { loaded&&<table className="w-full table-auto border-collapse">
            <thead>
                <tr className="bg-pink-100 border-b-2 border-pink-200">
                    <th className="px-4 py-3 text-pink-800 font-semibold">productId</th>
                     <th className="px-4 py-3 text-pink-800 font-semibold">productName</th>
                     <th className="px-4 py-3 text-pink-800 font-semibold">productPrice</th>
                      <th className="px-4 py-3 text-pink-800 font-semibold">labledPrice</th>
                       <th className="px-4 py-3 text-pink-800 font-semibold">stock</th>
                       <th className="px-4 py-3 text-pink-800 font-semibold">Actions</th>

                </tr>

                
            </thead>
            <tbody>
               {products.map((product) => {
        console.log("mapping", product.productId);
        return (
        <tr key={product.productId} className="border-b border-pink-100 hover:bg-pink-50 text-center transition">
            <td className="px-4 py-2 text-slate-700">{product.productId}</td>
            <td className="px-4 py-2 text-slate-700">{product.name}</td>
            <td className="px-4 py-2 text-slate-700">{product.price}</td>
            <td className="px-4 py-2 text-slate-700">{product.labledPrice}</td>
            <td className="px-4 py-2 text-slate-700">{product.stock}</td>
            <td className="px-4 py-2">
              <div className="w-full h-full flex justify-center gap-4">
                 <FaRegTrashCan onClick={
                  ()=>{
                    deleteProduct(product.productId)
                  }
                 }

                
                 className="text-lg hover:text-pink-800 cursor-pointer transition"  />
                 <GrEdit 
                     onClick={
                      ()=>{
                        navigate("/admin/editProduct",{
                          state:product
                        })
                        
                      }
                     }
                 
                 className="text-lg hover:text-pink-800 cursor-pointer transition"/>
              </div>
            </td>
            
        </tr>
        )
      })}
            </tbody>
        </table>}
        {
          !loaded&&
         <Loader/>
        }
     
    </div>
  );
}

