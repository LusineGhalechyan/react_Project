import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./NavMenu.module.scss";

const NavMenu = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            to="/"
            exact
            className={styles.navLink}
            activeClassName={styles.activePage}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            exact
            className={styles.navLink}
            activeClassName={styles.activePage}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            exact
            className={styles.navLink}
            activeClassName={styles.activePage}
          >
            Contact
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavMenu;
