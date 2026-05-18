import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loaded";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
	const [displayingOrder, setDisplayingOrder] = useState(null);

	useEffect(() => {
		if (!loaded) {
			const token = localStorage.getItem("token");
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setOrders(response.data);
					setLoaded(true);
					console.log(response.data);
				});
		}
	}, [loaded]);
	/*
    {
    "_id": "68179297609566291e7ccfc1",
    "orderId": "ORD0007",
    "email": "customer@gmail.com",
    "name": "Dilshan X",
    "address": "abc,456",
    "status": "Pending",
    "phoneNumber": "0777123789",
    "billItems": [
        {
            "productId": "COSM24003",
            "productName": "AquaFresh Face Wash",
            "image": "https://acfihbfmgdmhzxvboogf.supabase.co/storage/v1/object/public/images/174515966319584f4fd3735fd65a04e6c05bc45d72df7.jpg",
            "quantity": 2,
            "price": 499,
            "_id": "68179297609566291e7ccfc2"
        },
        {
            "productId": "COSM24004",
            "productName": "SunGuard SPF 50+",
            "image": "https://acfihbfmgdmhzxvboogf.supabase.co/storage/v1/object/public/images/1745159690195619e443b79141a8e7e080f38abaa5774.jpg",
            "quantity": 2,
            "price": 749,
            "_id": "68179297609566291e7ccfc3"
        }
    ],
    "total": 2496,
    "date": "2025-05-04T16:15:19.185Z",
    "__v": 0
}
    */

    function changeOrderStatus(orderId,status){
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+orderId, {
            status: status
        },{
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(
            ()=>{
                toast.success("Order status changed successfully");
                setLoaded(false)
            }
        )
        
    }

	return (
		<div className="w-full h-full ">
			{loaded ? (
				<div className="w-full h-full bg-pink-50 p-0">
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-pink-100 border-b-2 border-pink-200">
								<th className="p-3 text-pink-800 font-semibold min-w-[120px]">Order ID</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[200px]">Customer Email</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[120px]">Customer Name</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[150px]">Address</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[120px]">Phone Number</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[120px]">Status</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[100px]">Total</th>
								<th className="p-3 text-pink-800 font-semibold min-w-[140px]">Date</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								return (
									<tr
										key={order.orderId}
										className="border-b border-pink-100 text-center cursor-pointer hover:bg-pink-50 transition"
									>
										<td className="p-2 min-w-[120px]">{order.orderId}</td>
										<td className="p-2 min-w-[200px]">{order.email}</td>
										<td className="p-2 min-w-[120px]">{order.name}</td>
										<td className="p-2 min-w-[150px]">{order.address}</td>
										<td className="p-2 min-w-[120px]">{order.phoneNumber}</td>
										<td className="p-2 min-w-[120px]">
												<select value={order.status} className="z-[50] border border-pink-200 rounded px-2 py-1 bg-white text-slate-700 focus:border-pink-800 focus:ring-2 focus:ring-pink-200 outline-none" onChange={
                                                (e)=>{
                                                    changeOrderStatus(order.orderId,e.target.value)
                                                }
                                            }>
												<option value={"Pending"}>Pending</option>
												<option value={"Delivered"}>Delivered</option>
												<option value={"Cancelled"}>Cancelled</option>
												<option value={"Processing"}>Processing</option>
											</select>
										</td>
										<td className="p-2 min-w-[100px] whitespace-nowrap">{order.total.toFixed(2)}</td>
										<td className="p-2 min-w-[140px] whitespace-nowrap text-sm">
											{new Date(order.date).toDateString()}
										</td>
										<td className="p-2">
											<button
												className="bg-pink-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-900 transition shadow-md"
												onClick={() => {
													setModalIsDisplaying(true);
													setDisplayingOrder(order);
												}}
											>
												Details
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{modalIsDisplaying && (
						<div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
								<div className="w-[450px] max-w-[450px] h-[500px] max-h-[500px] bg-white rounded-2xl shadow-2xl relative">
									<div className="w-full h-[120px] border-b border-pink-200 bg-gradient-to-r from-pink-50 to-white rounded-t-2xl p-3">
										<h1 className="text-lg font-bold text-pink-800 p-2">
											Order ID: {displayingOrder.orderId}
										</h1>
										<h1 className="text-sm font-semibold text-slate-600 p-2">
											Order Date: {new Date(displayingOrder.date).toDateString()}
										</h1>
										<h1 className="text-sm font-semibold text-slate-600 p-2">
											Order Status: <span className="text-pink-800 font-bold">{displayingOrder.status}</span>
										</h1>
										<h1 className="text-sm font-semibold text-slate-600 p-2">
											Order Total: <span className="text-pink-800 font-bold">LKR {displayingOrder.total.toFixed(2)}</span>
									</h1>
								</div>
							<div className="w-full h-[380px] max-h-[380px] overflow-y-scroll p-2 bg-pink-50">
								{displayingOrder.billItems.map((item, index) => {
									return (
										<div
											key={index}
											className="w-full h-[80px] bg-white rounded-lg shadow border border-pink-100 my-1 flex justify-between items-center hover:shadow-md transition"
										>
											<img
												src={item.image}
												className="h-full aspect-square object-cover rounded-l-lg"
											/>
											<div className="h-full max-w-[280px] w-[280px] overflow-hidden p-2">
												<h1 className="text-sm font-bold text-slate-800">
													{item.productName}
												</h1>
												<h2 className="text-xs text-pink-800 font-semibold">
													LKR: {item.price.toFixed(2)}
												</h2>
												<h2 className="text-xs text-slate-600">
													Quantity: {item.quantity}
												</h2>
											</div>
										</div>
									);
								})}
							</div>
								<button
									className="w-[40px] absolute right-[-20px] top-[-20px] h-[40px] rounded-full bg-pink-800 text-white shadow-lg flex justify-center items-center hover:bg-pink-900 transition"
									onClick={() => {
										setModalIsDisplaying(false);
									}}
								>
									<IoCloseSharp size={20} />
								</button>
							</div>
						</div>
					)}
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
