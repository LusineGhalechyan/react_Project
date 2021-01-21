import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const info = [
    {
      id: 1,
      value: "Nor Hachn, Kotayk province, Republic of Armenia",
    },
    {
      id: 2,
      value: "E-Mail: lusyghalechyan@gmail.com",
    },
    { id: 3, value: "Phone: +374 93 416 572" },
  ];

  const links = [
    {
      to: "https://www.linkedin.com/in/lusine-ghalechyan-10b342b5/",
      value: "in",
    },
    {
      to: "https://github.com/LusineGhalechyan",
      value: "gh",
    },
  ];

  return (
    <footer>
      <section className={styles.footerContactDetails}>
        {info.length &&
          info.map(({ value, id }) => <span key={id}>{value}</span>)}
      </section>

      <div className={styles.footerContactPageText}>ENGAGE WITH ME ON</div>
      <section className={styles.footerContactPages}>
        <span>
          {links.length &&
            links.map(({ to, value }, i) => (
              <Link
                key={`key-${i}`}
                to={{ pathname: to }}
                target="_blank"
                className={i === 0 ? styles.linkLink : styles.linkGitHub}
              >
                {value}
              </Link>
            ))}
        </span>
      </section>

      <section className={styles.footerCopyrightContent}>
        <p className={styles.copyright}>Copyrights BITSCHOOL {currentYear}</p>
      </section>
    </footer>
  );
};

export default Footer;
