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
    <div className="w-full h-full rounded-lg relative ">
      <Link to={"/admin/addproduct"} className="text-white bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 absolute right-5 bottom-5">
        <FaPlus />
      </Link>
       { loaded&&<table className="w-full table-auto border border-gray-300">
            <thead>
                <tr>
                    <th >productId</th>
                     <th >productName</th>
                     <th >productPrice</th>
                      <th >labledPrice</th>
                       <th >stock</th>
                       <th>Actions</th>

                </tr>

                
            </thead>
            <tbody>
               {products.map((product) => {
        console.log("mapping", product.productId);
        return (
        <tr key={product.productId} className="border-b hover:bg-gray-100 text-center">
            <td className="px-4 py-2">{product.productId}</td>
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">{product.price}</td>
            <td className="px-4 py-2">{product.labledPrice}</td>
            <td className="px-4 py-2">{product.stock}</td>
            <td className="px-4 py-2">
              <div className=" w-full h-full  flex justify-center gap-4 ">
                 <FaRegTrashCan onClick={
                  ()=>{
                    deleteProduct(product._id)
                  }
                 }

                
                 className="text-[20px] hover:text-red-600"  />
                 <GrEdit 
                     onClick={
                      ()=>{
                        navigate("/admin/editProduct",{
                          state:product
                        })
                        
                      }
                     }
                 
                 className="text-[20px] hover:text-blue-600"/>
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

