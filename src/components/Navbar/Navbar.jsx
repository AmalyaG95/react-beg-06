import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavLinkCls = ["py-3", "px-5", styles.NavLink];
const NavCls = ["my-3", "justify-content-center", styles.Nav];

const Navbar = () => {
  return (
    <Nav className={NavCls.join(" ")}>
      <Nav.Item className="py-3 px-5">
        <NavLink
          to="/"
          activeClassName={styles.activeNavLink}
          className={NavLinkCls.join(" ")}
          exact
        >
          Home
        </NavLink>
      </Nav.Item>

      <Nav.Item className="py-3 px-5">
        <NavLink
          to="/contact"
          activeClassName={styles.activeNavLink}
          className={NavLinkCls.join(" ")}
          exact
        >
          Contact
        </NavLink>
      </Nav.Item>

      <Nav.Item className="py-3 px-5">
        <NavLink
          to="/about"
          activeClassName={styles.activeNavLink}
          className={NavLinkCls.join(" ")}
          exact
        >
          About
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
