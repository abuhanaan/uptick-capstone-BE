"use client";
import React from "react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Image
            src="/nav-logo.png"
            width={150}
            height={500}
            alt="uptick logo"
          />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/programs">Programs</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
          </ul>
        </div>
        <div className="nav-btn">
          <Link href="/programs">
            <button>Explore Our Programs</button>
          </Link>
        </div>
        {showDropdown ? (
          <FaTimes className="menu-icon" onClick={toggleDropdown} />
        ) : (
          <FaBars className="menu-icon" onClick={toggleDropdown} />
        )}
      </nav>

      {showDropdown && (
        <div className="dropdown-menu">
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/programs">Programs</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
          </ul>
          <div className="nav-btn">
            <Link href="/programs">
              <button>Explore Our Programs</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
