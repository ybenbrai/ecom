import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="logo"
          />
        </Link>
      </div>

      <div className="nav-links">
        <Link href="/" className="nav-button">
          Home
        </Link>
        <Link href="/products" className="nav-button">
          Products
        </Link>
        <Link href="/downloads" className="nav-button">
          Downloads
        </Link>
        <Link href="/contact" className="nav-button">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
