import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="newsletter">
          {" "}
          <Image
            src="/nav-logo.png"
            width={150}
            height={500}
            alt="uptick logo"
          />
          <h6>
            <span id="content1">
              Stay in the loop with the latest industry insights,
            </span>{" "}
            <span id="content2">success stories, and program updates.</span>
            <span id="content3"> Subscribe to our newsletter today!</span>
          </h6>
          <div className="subscribe-form">
            <form>
              <input
                type="email"
                name="newsletter-email"
                placeholder="Enter your email address"
              />
              <button>SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <div className="useful-links">
          <h5>Useful Links</h5>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
          </ul>
        </div>
        <div className="programs">
          <h5>Our Programs</h5>
          <ul>
            <li>
              <Link href="/programs/talent-beginners">
                Uptick Talent Beginners
              </Link>
            </li>
            <li>
              <Link href="/programs/talent-tech">Uptick Talent Tech</Link>
            </li>
            <li>
              <Link href="/programs/talent-business">
                Uptick Talent Business
              </Link>
            </li>
            <li>
              <Link href="/programs/talent-map">Uptick Talent Map</Link>
            </li>
          </ul>
        </div>
        <div className="contact-us">
          <h5>Contact Us</h5>
          <ul>
            <li>
              <Image
                src="/phone-icon.png"
                width={25}
                height={25}
                alt="phone icon"
              />
              <span>+234 9037424764</span>
            </li>
            <li>
              <Image
                src="/mail-icon.png"
                width={25}
                height={25}
                alt="mail icon"
              />
              <span>hey@upticktalent.africa</span>
            </li>
            <li>
              <Image
                src="/location-icon.png"
                width={50}
                height={50}
                alt="location icon"
              />
              <span>
                7A, Hara-Hyel House, Dogon Karfe, Jos, Plateau State, Nigeria
              </span>
            </li>
          </ul>
        </div>
      </div>{" "}
      <div className="footer-end">
        <h6>Copyright © 2023 Uptick Talent All Rights Reserved</h6>
        <div className="footer-socials">
          <Link href="uptick-twitter">
            <Image
              src="/twitter-icon.png"
              width={30}
              height={30}
              alt="twitter icon"
            />
          </Link>
          <Link href="uptick-instagram">
            <Image
              src="/instagram-icon.png"
              width={30}
              height={30}
              alt="instagram icon"
            />
          </Link>
          <Link href="uptick-linkedin">
            <Image
              src="/linkedin-icon.png"
              width={30}
              height={30}
              alt="linkedin icon"
            />
          </Link>
          <Link href="uptick-facebook">
            <Image
              src="/facebook-icon.png"
              width={30}
              height={30}
              alt="facebook icon"
            />
          </Link>
        </div>
        <h6>| Privacy Policy | Terms of Service</h6>
      </div>
    </footer>
  );
};

export default Footer;
