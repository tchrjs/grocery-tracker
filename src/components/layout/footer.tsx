import { ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full h-full flex flex-grow justify-center items-end p-2">
      <div className="flex-grow"></div>
      <div className="rounded-full bg-green-500 p-4 mb-8 mr-4">
        <ShoppingCart />
      </div>
    </footer>
  );
}
