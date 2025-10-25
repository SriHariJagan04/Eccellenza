import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Home, Info, Phone, Briefcase } from "lucide-react";
import styles from "./navbar.module.css";
import { ThemeContext } from "../../Store/useContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0); // default to Home
  const navRefs = useRef([]);

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/about", label: "About", icon: <Info size={18} /> },
    { path: "/services", label: "Services", icon: <Briefcase size={18} /> },
    { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  // Update activeIndex when route changes
  useEffect(() => {
    const index = navItems.findIndex(item => item.path === location.pathname);
    setActiveIndex(index !== -1 ? index : 0); // fallback to Home
  }, [location.pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <img src="/Images/logo1.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>

      <div className={styles.navLinks}>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            ref={el => (navRefs.current[index] = el)}
            className={styles.navLink}
          >
            {item.icon} {item.label}
          </Link>
        ))}

        {/* Moving Box Indicator */}
        {navRefs.current[activeIndex] && (
          <span
            className={styles.navIndicator}
            style={{
              width: navRefs.current[activeIndex].offsetWidth,
              transform: `translateX(${navRefs.current[activeIndex].offsetLeft}px)`
            }}
          ></span>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
