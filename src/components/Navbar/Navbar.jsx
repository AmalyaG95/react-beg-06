import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavCls = ["m-3", "justify-content-start", styles.Nav];
const NavItemCls = ["py-2", styles.NavItem];
const NavLinkCls = ["py-2", "px-4", styles.NavLink];

const navItems = [
  {
    to: "/",
    value: "Home",
  },
  {
    to: "/contact",
    value: "Contact",
  },
  {
    to: "/about",
    value: "About",
  },
];

const Navbar = () => {
  const navItemsJSX = navItems.map((navItem, index) => {
    return (
      <Nav.Item key={index} className={NavItemCls}>
        <NavLink
          to={navItem.to}
          className={NavLinkCls.join(" ")}
          activeClassName={styles.activeNavLink}
          exact={true}
        >
          {navItem.value}
        </NavLink>
      </Nav.Item>
    );
  });

  return <Nav className={NavCls.join(" ")}>{navItemsJSX}</Nav>;
};

export default Navbar;
