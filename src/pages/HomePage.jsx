import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ProductsPage from "../pages/client/ProductsPage";
import ProductOverview from "../pages/client/productOverview";
import CartPage from "./client/Cart";
import CheckoutPage from "./client/CheckOut";
import Home from "./client/Home";
import ContactUs from "./client/ContactUs";
import ReviewPage from "./client/ReviewPage";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#fff8f4]">
      <Header />

      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/overview/:productId" element={<ProductOverview/>}/>
          <Route path="cart" element={<CartPage/>}/>
         
          <Route path="/checkout" element={<CheckoutPage/>}/>

           <Route path="*" element={<h1>404 Not found</h1>} />
          
        </Routes>
      </div>
    </div>
  );
}
