"use client";
import { useState } from "react";
import Link from "next/link";
import headerStyles from "@/app/styles/header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

export const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <header className={headerStyles.header}>
        <div className={headerStyles.logo}>
          <img
            src="/uptick-logo.webp"
            alt="uptick talent logo"
            className={headerStyles.logoImg}
          />
        </div>
        <div>
          <ul className={headerStyles.links}>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/jobs">
                Jobs
              </Link>
            </li>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {showDropdown ? (
          <FaTimes className={headerStyles.menuBar} onClick={toggleDropdown} />
        ) : (
          <FaBars className={headerStyles.menuBar} onClick={toggleDropdown} />
        )}
      </header>
      {showDropdown && (
        <div className={headerStyles.dropdownMenu}>
          <ul className={headerStyles.navLinks}>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/jobs">
                Jobs
              </Link>
            </li>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
