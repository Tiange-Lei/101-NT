import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="nav-menu">
      <div className="logo-div"><Image className="logo-img" src='/logo.jpg' alt="logo" height="80" width="160"/></div>
      <div className="menu-item">
        <Link href="/">Home</Link>
      </div>
      <div className="menu-item">
        <Link href="/aboutUs">About Us</Link>
      </div>
      <div className="menu-item">
        <Link href="/contactUs">Contact Us</Link>
      </div>
    </div>
  );
};
export default Navbar;
