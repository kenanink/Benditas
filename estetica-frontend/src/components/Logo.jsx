import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/Logo.jpeg" 
        alt="Benditas Pestañas Logo" 
        className="h-12 w-auto object-contain"
      />
    </Link>
  );
}