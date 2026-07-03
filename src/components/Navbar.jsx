import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <p className={styles.logo}>Job<span>Board</span></p>
      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink>
        <NavLink to="/bookmark" className={({ isActive }) => isActive ? styles.active : ""}>Bookmarks</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;