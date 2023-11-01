"use client";
import { useState } from "react";
import Link from "next/link";
import headerStyles from "@/app/styles/header.module.css";

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
              <Link
                onClick={toggleDropdown}
                className={headerStyles.link}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/programs">
                Programs &#x2BC6;
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/jobs">
                Jobs
              </Link>
            </li>
            <li>
              {" "}
              <Link className={headerStyles.link} href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className={headerStyles.link} href="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* {showDropdown && (
        <div className={headerStyles.modal}>
          <ul className={headerStyles.modalContents}>
            <li>
              {" "}
              <Link
                className={headerStyles.modalContent}
                href="/programs/beginners"
              >
                Talent Beginners
              </Link>
            </li>
            <li>
              <Link className={headerStyles.modalContent} href="/programs/tech">
                Talent Tech
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className={headerStyles.modalContent}
                href="/programs/business"
              >
                Talent Business
              </Link>
            </li>
            <li>
              <Link className={headerStyles.modalContent} href="/programs/map">
                Talent Map
              </Link>
            </li>
          </ul>
        </div>
      )} */}
    </>
  );
};
