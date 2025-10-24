import { Link } from "react-router-dom";

export default function AboutMenu() {
  return (
<ul>
<li><Link to="/about-us">Company</Link></li>
<li><Link to="/contact-us">Contact Us</Link></li>
<li><Link to="/blogs">Blogs</Link></li>
</ul>
  )
}
