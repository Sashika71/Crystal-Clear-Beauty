import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/Loaded";
import ProductCard from "../../components/Productcard";
import Footer from "../../components/Footer";
import { PRODUCT_CATEGORIES } from "../../constants/productCategories";

 


export default function ProductsPage() {

  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const visibleProducts = selectedCategory === "All"
    ? productList
    : productList.filter(product => product.category === selectedCategory);

return (
  <>
    <div className="h-full w-full py-2">
      {
        productsLoaded? 
        <div className="w-full h-full py-8">
          <div className="flex flex-wrap justify-center gap-3 px-4 pb-8">
            {["All", ...PRODUCT_CATEGORIES].map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${selectedCategory === category ? "border-pink-800 bg-pink-800 text-white" : "border-pink-200 bg-white text-pink-800 hover:bg-pink-50"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-4">
            {visibleProducts.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <p className="py-12 text-center text-slate-500">No products in this category yet.</p>
          )}
        </div>
        : <Loader />
    }
    </div>
    <Footer />
  </>
)
}

