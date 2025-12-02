
import { Link, Routes, Route } from 'react-router-dom';

import { FaUsers } from "react-icons/fa6";
import AdminProdutcsPage from './admin/products';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/editProduct';

export default function AdminPage(){
    return(
         <div className =" w-full h-screen bg-gray-200 flex p-2" >

            <div className="h-full w-[300px] bg-white" >
               <Link to="/admin/users" className="text-blue-500 hover:underline flex items-center p-2 "><FaUsers className='mr-2' />Users</Link>
               <Link to="/admin/products" className="text-blue-500 hover:underline flex item-center">Products</Link>
               <Link to="/admin/orders" className="text-blue-500 hover:underline flex item-center">Orders</Link>
                </div>



            <div className="h-full w-[calc(100vw-300px)] bg-gray-200" >
              
 <Routes>
<Route index element={<h1>Welcome to Admin Dashboard</h1>} />
  <Route path="/users" element={<h1>Users</h1>} />
  <Route path="/products" element={<AdminProdutcsPage/>} />
  <Route path="/orders" element={<h1>Orders</h1>} />
  <Route path="/addproduct" element={<AddProduct/>}/>
  <Route path="/editproduct" element={<EditProduct/>}/>
</Routes>

                
                
                
                
            </div>  
         </div>



    )
}