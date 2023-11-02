import Link from "next/link";
import footerStyles from "@/app/styles/footer.module.css";

export const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerContainer}>
        <div className={footerStyles.footerGrid}>
          <div className={footerStyles.footerDetails}>
            <img
              src="/uptick-footer-logo.webp"
              alt="uptick footer logo"
              className={footerStyles.footerImg}
            />
            <h6 className={footerStyles.footerH6}>
              At Uptick Talent, we are on a relentless mission to cultivate the
              next generation of technology and business leaders.
            </h6>
          </div>
          <div className={footerStyles.footerPrograms}>
            <h3>Programs</h3>
            <ul>
              <li className={footerStyles.footerLink}>
                <Link href="/programs/beginner">Uptick Talent Beginners</Link>
              </li>
              <li className={footerStyles.footerLink}>
                <Link href="/programs/tech">Uptick Talent Tech</Link>
              </li>
              <li className={footerStyles.footerLink}>
                <Link href="/programs/business">Uptick Talent Business</Link>
              </li>
              <li className={footerStyles.footerLink}>
                <Link href="/programs/map">Uptick Talent Map</Link>
              </li>
            </ul>
          </div>
          <div className={footerStyles.footerReadMore}>
            <h3>Read More</h3>
            <ul>
              <li className={footerStyles.footerLink}>
                <Link href="/about">About Us</Link>
              </li>
              <li className={footerStyles.footerLink}>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li className={footerStyles.footerLink}>
                <Link href="/jobs">Jobs</Link>
              </li>
            </ul>
          </div>
          <div className={footerStyles.footerSocials}>
            {" "}
            <ul>
              <li className={footerStyles.footerLink}>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li className={footerStyles.footerLink}>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
            <h4 className={footerStyles.footerH4}>Follow Us</h4>
            <div>
              <ul className={footerStyles.socialLinks}>
                <li className={footerStyles.SocialLink}>
                  <Link href="facebook.com">
                    <img src="/facebook.png" alt="facebook icon" />
                  </Link>
                </li>
                <li className={footerStyles.SocialLink}>
                  <Link href="linkedin.com">
                    <img src="/linkedin.png" alt="linkedin icon" />
                  </Link>
                </li>
                <li className={footerStyles.SocialLink}>
                  <Link href="twitter.com">
                    <img src="/twitter.png" alt="twitter icon" />
                  </Link>
                </li>
                <li className={footerStyles.SocialLink}>
                  <Link href="instagram.com">
                    <img src="/instagram.png" alt="instagram icon" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={footerStyles.footerCopyright}>
          &copy; 2023 Uptick Talent | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
