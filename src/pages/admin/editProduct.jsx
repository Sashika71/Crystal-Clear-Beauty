import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../../Utils/mediaUplaod";


export default function EditProduct() {
    const locationData=useLocation();

    const navigate = useNavigate();
    if(!locationData.state==null){
        toast.error("please select a  product to edit")
        window.location.href="/admin/products"
    }
    const [productId, setProductId] = useState(locationData.state.productId);
    const [productName, setProductName] = useState(locationData.state.productName);
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const[images,setImages]=useState([]);
    
   
    async  function handleSubmit(){
const promisesArray=[]
for(let i=0;i<images.length;i++){
    
const promise=mediaUpload(images[i])
promisesArray[i]=promise
}

const result =await Promise.all(promisesArray)
try{
       const altNamesInArray=altNames.split(",");
        const product= {
            productId: productId,
            name: productName,
           altName: altNamesInArray,
            price: price,
            labledPrice: labeledPrice,
            description: description,
            stock: stock,
            images:result
          
        }

        const token=localStorage.getItem("token")
         console.log(token)
       await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
                headers: { Authorization: `Bearer ${token}` },
            })
//            .then(() => {
//     toast.success("Product saved successfully");
//          navigate("/admin/products");
// })
// .catch((error) => {
//     toast.error("Product adding failed");
//     console.error(error);
// });
         
//        console.log(product) 
//        toast.success("product saved")
// }
toast.success("product saved sucessfully")
 navigate("/admin/products");
}
catch(error){
    console.log(error);
    toast.error("Product adding failed");
}

}


    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center p-5">
                <input
                disabled
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product ID"
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                />

                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />

                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Alternative Names"
                    value={altNames}
                    onChange={e => setAltNames(e.target.value)}
                />

                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Labeled Price"
                    type="number"
                    value={labeledPrice}
                    onChange={e => setLabeledPrice(e.target.value)}
                />

                <textarea
                    className="w-[400px] h-[100px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                
                <input 
                type="file"
                onChange={(e)=>
                {
                    setImages(e.target.files)
                }
                }
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px] cursor-pointer"
                // accept="image/*"
                placeholder="upload the images"
                multiple
                
                >
                </input>

                <input
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                    placeholder="Stock"
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />
                

                <button 
    className="w-[400px] h-[50px] bg-blue-600 text-white rounded-xl m-[5px] hover:bg-blue-700"
    onClick={handleSubmit}  // <-- Add this
>
    Edit Product
</button>
            </div>
        </div>
    );
}