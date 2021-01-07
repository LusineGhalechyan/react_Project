import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavMenu.module.scss";

const NavMenu = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      className={styles.navBarContainer}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            to="/"
            exact
            className={styles.navLink}
            activeClassName={styles.activePage}
          >
            <FontAwesomeIcon icon={faHome} />
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
          <NavLink
            to="/counter"
            exact
            className={styles.navLink}
            activeClassName={styles.activePage}
          >
            Counter
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavMenu;
