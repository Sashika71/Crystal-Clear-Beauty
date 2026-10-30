
import { Link, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import { FaBars, FaUsers, FaXmark } from "react-icons/fa6";
import AdminProdutcsPage from './admin/products';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/editProduct';
import AdminOrdersPage from './admin/adminOrders';

export default function AdminPage(){
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return(
        <div className="w-full min-h-screen bg-pink-50 flex flex-col gap-2 p-2 md:h-screen md:flex-row">

    <div className="relative z-50 w-full shrink-0 rounded-lg border-r-0 bg-white shadow-sm md:h-full md:w-[300px] md:border-r md:border-pink-200">
      <div className={`${sidebarOpen ? "hidden" : "flex"} relative z-50 items-center gap-3 rounded-lg bg-white p-3 md:hidden`}>
        <button
          type="button"
          onClick={() => setSidebarOpen((isOpen) => !isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-pink-800 transition hover:bg-pink-100"
          aria-label={sidebarOpen ? "Close admin menu" : "Open admin menu"}
          aria-expanded={sidebarOpen}
        >
                         {sidebarOpen ? <FaXmark /> : <FaBars />}
        </button>
        <span className="font-semibold text-pink-800">Admin Menu</span>
      </div>
      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          aria-label="Close admin menu"
        />
      )}
      <nav className={`fixed inset-y-0 left-0 z-40 w-72 border-r-0 bg-white px-3 pb-2 pt-3 shadow-xl transition-transform duration-300 md:static md:block md:w-auto md:translate-x-0 md:border-t-0 md:px-0 md:pt-0 md:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-3 flex items-center gap-3 border-b border-pink-100 px-1 pb-3 md:hidden">
          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-pink-800 transition hover:bg-pink-100"
            aria-label="Close admin menu"
          >
            <FaXmark />
          </button>
          <span className="font-semibold text-pink-800">Admin Menu</span>
        </div>
        <Link onClick={closeSidebar} to="/admin/users" className="text-pink-800 hover:bg-pink-100 hover:text-pink-900 flex items-center p-3 font-semibold transition rounded-md"><FaUsers className='mr-2' />Users</Link>
        <Link onClick={closeSidebar} to="/admin/products" className="text-pink-800 hover:bg-pink-100 hover:text-pink-900 flex items-center p-3 font-semibold transition rounded-md">Products</Link>
        <Link onClick={closeSidebar} to="/admin/orders" className="text-pink-800 hover:bg-pink-100 hover:text-pink-900 flex items-center p-3 font-semibold transition rounded-md">Orders</Link>
      </nav>
                </div>



            <div className="min-h-0 min-w-0 w-full flex-1 overflow-x-hidden overflow-y-auto rounded-lg bg-pink-50 shadow-sm md:ml-0">
              
 <Routes>
<Route index element={<h1 className="p-4 text-2xl font-bold text-pink-800 sm:p-8 sm:text-4xl">Welcome to Admin Dashboard</h1>} />
  <Route path="/users" element={<h1 className="p-4 text-2xl font-bold text-pink-800 sm:p-8 sm:text-4xl">Users</h1>} />
  <Route path="/products" element={<AdminProdutcsPage/>} />
  <Route path="/orders" element={<AdminOrdersPage/>} />
  <Route path="/addproduct" element={<AddProduct/>}/>
  <Route path="/editproduct" element={<EditProduct/>}/>
</Routes>

                
                
                
                
            </div>  
         </div>



    )
}