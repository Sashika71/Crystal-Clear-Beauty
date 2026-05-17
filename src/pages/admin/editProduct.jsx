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
       await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
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
        <div className="w-full h-full rounded-lg flex justify-center items-center bg-pink-50 p-4">
            <div className="w-full max-w-md rounded-3xl border border-pink-200 bg-white shadow-lg flex flex-col items-center p-8">
                <input
                disabled
                    className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Product ID"
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                />

                <input
                    className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />

                <input
                    className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Alternative Names"
                    value={altNames}
                    onChange={e => setAltNames(e.target.value)}
                />

                <input
                    className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <input
                    className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Labeled Price"
                    type="number"
                    value={labeledPrice}
                    onChange={e => setLabeledPrice(e.target.value)}
                />

                <textarea
                    className="w-full h-20 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
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
                className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 cursor-pointer focus:border-pink-800"
                // accept="image/*"
                placeholder="upload the images"
                multiple
                
                >
                </input>

                <input
                    className="w-full h-12 border border-pink-200 rounded-xl px-4 py-2 m-2 outline-none focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Stock"
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />
                

                <button 
    className="w-full h-12 bg-pink-800 text-white rounded-xl m-2 font-semibold transition hover:bg-pink-900 shadow-lg shadow-pink-200"
    onClick={handleSubmit}
>
    Edit Product
</button>
            </div>
        </div>
    );
}