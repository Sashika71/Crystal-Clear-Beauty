import { Link } from "react-router-dom";

export default function ProductCard(props) {

  const product = props.product;

  return (
    <Link to={"/overview/"+product.productId} className="w-[250px] mx-4 h-[350px] shadow-2xl">
      <img 
        className="w-full h-[220px] object-cover"
        src={product.images[0]}
      />
      <div className="h-[120px] w-full flex justify-center flex-col px-4">
        <p className="text-sm text-gray-400">{product.productId}</p>
        <p className="text-lg font-bold">{product.name}</p>
        <p>
          {product.price.toFixed(2)} <span className="line-through">
            {product.price<product.labledPrice&&product.labledPrice.toFixed(2)}
          </span>
        </p>
      </div>
    </Link>
  );
}
