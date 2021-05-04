import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavCls = ["m-3", "justify-content-start", styles.Nav];
const NavLinkCls = ["py-2", "px-4", styles.NavLink];

const navItems = [
  {
    to: "/",
    value: "ToDo App",
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
      <Nav.Item key={index} className={styles.item}>
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
