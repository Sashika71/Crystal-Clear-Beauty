import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../../Utils/mediaUplaod";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";


export default function AddProduct() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
    const [stock, setStock] = useState("");
    const[images,setImages]=useState([]);
    const navigate = useNavigate();
   
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
            category: category,
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
        <div className="mx-auto w-full max-w-3xl px-3 py-4 sm:px-8 sm:py-8">
            <form className="mx-auto w-full max-w-2xl rounded-2xl border border-pink-200 bg-white p-4 shadow-sm sm:p-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="mb-6 border-b border-pink-100 pb-4">
                    <h1 className="text-2xl font-bold text-pink-900">Add Product</h1>
                    <p className="mt-1 text-sm text-slate-500">Enter the product details below.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                <input
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Product ID"
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                />

                <input
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Product Name"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />

                <input
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Alternative Names"
                    value={altNames}
                    onChange={e => setAltNames(e.target.value)}
                />

                <input
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <input
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Labeled Price"
                    type="number"
                    value={labeledPrice}
                    onChange={e => setLabeledPrice(e.target.value)}
                />

                <textarea
                    className="min-h-28 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200 sm:col-span-2"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <select
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    {PRODUCT_CATEGORIES.map(productCategory => (
                        <option key={productCategory} value={productCategory}>
                            {productCategory}
                        </option>
                    ))}
                </select>
                
                <input 
                type="file"
                onChange={(e)=>
                {
                    setImages(e.target.files)
                }
                }
                className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 cursor-pointer focus:border-pink-800 sm:col-span-2"
                // accept="image/*"
                placeholder="upload the images"
                multiple
                
                >
                </input>

                <input
                    className="h-12 w-full rounded-lg border border-pink-200 px-4 py-2 outline-none transition focus:border-pink-800 focus:ring-2 focus:ring-pink-200"
                    placeholder="Stock"
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />
                

                </div>
                <button className="mt-6 h-12 w-full rounded-lg bg-pink-800 font-semibold text-white shadow-sm transition hover:bg-pink-900" type="submit">
                    Save Product
                </button>
            </form>
        </div>
    );
}