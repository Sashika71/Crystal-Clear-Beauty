import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/Loaded";
import ProductCard from "../../components/Productcard";
import Footer from "../../components/Footer";

 


export default function ProductsPage() {

  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
      
          setProductList(res.data);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);
return (
  <>
    <div className="h-full w-full py-2">
      {
        productsLoaded? 
        <div className="w-full h-full flex flex-wrap justify-center gap-4 py-8">
{
    productList.map(
        (product, index) => {
            return(
                <ProductCard key={product.productId} product={product}/>
            )
        }
    )
}
</div>
        : <Loader />
    }
    </div>
    <Footer />
  </>
)
}

