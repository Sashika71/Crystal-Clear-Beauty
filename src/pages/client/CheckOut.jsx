import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function CheckoutPage() {
	const location = useLocation();
	// const [cart, setCart] = useState(location.state.items);
    const [cart, setCart] = useState(location.state?.items || []);
	const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
	const navigate = useNavigate();
   function placeOrder(){
    
        const orderData = {
            name : "name",
            address : "address",
            phoneNumber :phone,
            billItems : []        
        }
        for(let i = 0; i< cart.length; i++){
            orderData.billItems[i] = {
                productId : cart[i].productId,
                quantity : cart[i].quantity
            }
        }
        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
            headers: {
                Authorization: "Bearer " + token,
            },            
        }).then(()=>{
            toast.success("Order placed successfully");
            navigate("/");
        }).catch((error)=>{
            console.log(error);
            toast.error("Order placement failed");
        })
   }

	function getTotal() {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.quantity;
		});
		return total;
	}
	function getTotalForLabelledPrice() {
		let total = 0;
		cart.forEach((item) => {
			total += item.labeledPrice * item.quantity;
		});
		return total;
	}

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-6 rounded-[28px] border border-pink-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.6),_rgba(255,251,247,1)_60%,_rgba(255,255,255,1)_100%)] p-6 sm:p-8">
				<p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-500">Checkout</p>
				<h1 className="mt-2 text-3xl font-semibold text-slate-900">Complete your order</h1>
				<p className="mt-2 text-sm text-slate-600">Review your items and enter delivery details</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[1fr_360px]">
				<div className="space-y-4">
					{cart.map((item, index) => {
						return (
							<article key={index} className="relative flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
								<button className="absolute right-3 top-3 text-pink-600 bg-pink-50 rounded-full p-2 hover:bg-pink-100" onClick={() => {
									const newCart = cart.filter((product) => product.productId !== item.productId);
									setCart(newCart);
								}}>
									<TbTrash />
								</button>

								<img src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />

								<div className="flex-1 min-w-0">
									<h1 className="text-lg font-semibold text-slate-900 truncate">{item.name}</h1>
									<h2 className="text-sm text-slate-500 mt-1">{item.altName?.join(" | ")}</h2>
									<h2 className="text-sm text-slate-500 mt-1">LKR {item.price.toFixed(2)}</h2>
								</div>

								<div className="flex items-center gap-3">
									<button className="h-8 w-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-sm hover:bg-pink-50" onClick={() => {
										const newCart = cart;
										newCart[index].quantity -= 1;
										if (newCart[index].quantity <= 0) newCart[index].quantity = 1;
										setCart(newCart);
										setCartRefresh(!cartRefresh);
									}}>−</button>
									<div className="text-center w-8 text-sm font-semibold text-slate-900">{item.quantity}</div>
									<button className="h-8 w-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-sm hover:bg-pink-50" onClick={() => {
										const newCart = cart;
										newCart[index].quantity += 1;
										setCart(newCart);
										setCartRefresh(!cartRefresh);
									}}>+</button>
								</div>

								<div className="w-28 text-right">
									<p className="text-xs uppercase tracking-[0.25em] text-slate-400">Subtotal</p>
									<p className="text-lg font-semibold text-slate-900">LKR {(item.price * item.quantity).toFixed(2)}</p>
								</div>
							</article>
						);
					})}
				</div>

				<aside className="h-fit rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
					<h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

					<div className="mt-4 space-y-3 text-sm">
						<div className="flex items-center justify-between text-slate-600">
							<span>Total</span>
							<span>LKR {getTotalForLabelledPrice().toFixed(2)}</span>
						</div>
						<div className="flex items-center justify-between border-b border-pink-100 pb-3 text-slate-600">
							<span>Discount</span>
							<span>LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</span>
						</div>
						<div className="flex items-center justify-between text-base font-semibold text-slate-900">
							<span>Net Total</span>
							<span>LKR {getTotal().toFixed(2)}</span>
						</div>
					</div>

					<div className="mt-5 space-y-3">
						<label className="flex flex-col text-sm">
							<span className="mb-2 font-medium text-slate-900">Name</span>
							<input 
								type="text"
								placeholder="Full name"
								className="rounded-lg border border-pink-100 bg-pink-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label className="flex flex-col text-sm">
							<span className="mb-2 font-medium text-slate-900">Phone</span>
							<input 
								type="tel"
								placeholder="+94 77 123 4567"
								className="rounded-lg border border-pink-100 bg-pink-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</label>
						<label className="flex flex-col text-sm">
							<span className="mb-2 font-medium text-slate-900">Address</span>
							<input 
								type="text"
								placeholder="Delivery address"
								className="rounded-lg border border-pink-100 bg-pink-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</label>
					</div>

					<button 
						className="mt-5 w-full rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
						onClick={placeOrder}
					>
						Place Order
					</button>
				</aside>
			</div>
		</div>
	);
}
