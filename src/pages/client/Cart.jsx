
import { TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCart, {
    addToCart,
    getTotal,
    getTotalForLabelledPrice,
    removeFromCart,
} from "../../../Utils/Cart";

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cartLoaded) {
            const currentCart = getCart();
            setCart(currentCart);
            setCartLoaded(true);
        }
    }, [cartLoaded]);

    const total = getTotalForLabelledPrice();
    const netTotal = getTotal();
    const discount = total - netTotal;

    if (cart.length === 0) {
        return (
            <div className="mx-auto flex w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <section className="w-full rounded-[28px] border border-pink-100 bg-white p-8 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-500">
                        Your bag
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold text-slate-900">Your cart is empty</h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                        Add products to start building your beauty routine. Your selected items will appear here.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
                    >
                        Browse Products
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-pink-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.7),_rgba(255,251,247,1)_60%,_rgba(255,255,255,1)_100%)] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-500">Checkout</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Your Cart</h1>
                <p className="mt-2 text-sm text-slate-600">Review items, adjust quantity, and continue to secure checkout.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <section className="space-y-4">
                    {cart.map((item, index) => (
                        <article
                            key={index}
                            className="relative flex flex-col gap-4 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                        >
                            <button
                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200"
                                onClick={() => {
                                    removeFromCart(item.productId);
                                    setCartLoaded(false);
                                }}
                            >
                                <TbTrash />
                            </button>

                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28"
                            />

                            <div className="min-w-0 flex-1">
                                <h2 className="pr-10 text-lg font-semibold text-slate-900 sm:text-xl">{item.name}</h2>
                                <p className="mt-1 text-sm font-medium text-slate-500">LKR {item.price.toFixed(2)} each</p>
                            </div>

                            <div className="flex items-center gap-3 rounded-full border border-pink-200 bg-pink-50 px-3 py-2">
                                <button
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-pink-100"
                                    onClick={() => {
                                        addToCart(item, -1);
                                        setCartLoaded(false);
                                    }}
                                >
                                    -
                                </button>
                                <span className="w-6 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                                <button
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-pink-100"
                                    onClick={() => {
                                        addToCart(item, 1);
                                        setCartLoaded(false);
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <div className="text-right">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Subtotal</p>
                                <p className="text-lg font-semibold text-slate-900">LKR {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <aside className="h-fit rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between text-slate-600">
                            <span>Total</span>
                            <span>LKR {total.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-pink-100 pb-3 text-slate-600">
                            <span>Discount</span>
                            <span>- LKR {discount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                            <span>Net Total</span>
                            <span>LKR {netTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        className="mt-5 w-full rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
                        onClick={() => {
                            navigate("/checkout", {
                                state: {
                                    items: cart,
                                },
                            });
                        }}
                    >
                        Continue to Checkout
                    </button>
                </aside>
            </div>
        </div>
    );
}