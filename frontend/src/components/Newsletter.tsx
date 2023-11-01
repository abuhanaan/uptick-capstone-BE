import newsletterStyles from "@/app/styles/newsletter.module.css";

export const Newsletter = () => {
  return (
    <div className={newsletterStyles.newsletter}>
      <img
        src="/pattern.png"
        alt="design pattern"
        className={newsletterStyles.newsletterBackground1}
      />
      <img
        src="/Mask_Group.png"
        alt="design pattern"
        className={newsletterStyles.newsletterBackground2}
      />
      <h3 className={newsletterStyles.newsletterH3}>
        Subscribe To Our Newsletter
      </h3>
      <h5 className={newsletterStyles.newsletterH5}>
        Stay in the loop with the latest industry insights, <br /> success
        stories, and program updates. Subscribe <br /> to our newsletter today!
      </h5>
      <form className={newsletterStyles.newsletterForm}>
        <input type="email" name="email" placeholder="Email Address" />
        <button>Subscribe</button>
      </form>
    </div>
  );
};
