import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ProductsPage from "../pages/client/ProductsPage";
import ProductOverview from "../pages/client/productOverview";
import CartPage from "./client/Cart";
import CheckoutPage from "./client/CheckOut";


export default function HomePage() {
  return (
    <div className="w-full h-screen max-h-screen">
      <Header />

      <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] ">
        <Routes path="/*">
          <Route path="/" element={<h1>Home page</h1>} />     
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/overview/:productId" element={<ProductOverview/>}/>
          <Route path="cart" element={<CartPage/>}/>
         
          <Route path="/checkout" element={< AdminOrdersPage/>}/>

           <Route path="*" element={<h1>404 Not found</h1>} />
          
        </Routes>
      </div>
    </div>
  );
}
