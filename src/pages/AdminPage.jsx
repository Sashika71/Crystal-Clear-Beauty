
import { Link, Routes, Route } from 'react-router-dom';

import { FaUsers } from "react-icons/fa6";
import AdminProdutcsPage from './admin/products';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/editProduct';
import AdminOrdersPage from './admin/adminOrders';

export default function AdminPage(){
    return(
         <div className="w-full h-screen bg-pink-50 flex p-2">

            <div className="h-full w-[300px] bg-white border-r border-pink-200 rounded-lg shadow-sm">
               <Link to="/admin/users" className="text-pink-800 hover:bg-pink-100 hover:text-pink-900 flex items-center p-3 font-semibold transition rounded-md"><FaUsers className='mr-2' />Users</Link>
               <Link to="/admin/products" className="text-pink-800 hover:bg-pink-100 hover:text-pink-900 flex items-center p-3 font-semibold transition rounded-md">Products</Link>
               <Link to="/admin/orders" className="text-pink-800 hover:bg-pink-100 hover:text-pink-900 flex items-center p-3 font-semibold transition rounded-md">Orders</Link>
                </div>



            <div className="h-full w-[calc(100vw-300px)] bg-pink-50 rounded-lg shadow-sm ml-2 flex flex-col justify-center items-center">
              
 <Routes>
<Route index element={<h1 className="text-4xl font-bold text-pink-800">Welcome to Admin Dashboard</h1>} />
  <Route path="/users" element={<h1 className="p-8 text-4xl font-bold text-pink-800">Users</h1>} />
  <Route path="/products" element={<AdminProdutcsPage/>} />
  <Route path="/orders" element={<AdminOrdersPage/>} />
  <Route path="/addproduct" element={<AddProduct/>}/>
  <Route path="/editproduct" element={<EditProduct/>}/>
</Routes>

                
                
                
                
            </div>  
         </div>



    )
}