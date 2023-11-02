import newsletterStyles from "@/app/styles/newsletter.module.css";

export const Newsletter = () => {
  return (
    <div className={newsletterStyles.newsletter}>
      <div className={newsletterStyles.newsletterGrid}>
        <div className={newsletterStyles.newsletterContent}>
          <div className={newsletterStyles.content}>
            <h6>STAY IN THE KNOW</h6>
            <h3 className={newsletterStyles.newsletterH3}>
              Sign Up For Our Newsletter
            </h3>
            <h5 className={newsletterStyles.newsletterH5}>
              Stay in the loop with the latest industry insights, <br /> success
              stories, and program updates. Subscribe <br /> to our newsletter
              today!
            </h5>
            <form className={newsletterStyles.newsletterForm}>
              <div className={newsletterStyles.inputs}>
                <div className={newsletterStyles.inputBox}>
                  <h6>First Name</h6>
                  <input
                    type="text"
                    name="first-name"
                    placeholder="First Name"
                  />
                </div>
                <div className={newsletterStyles.inputBox}>
                  <h6>Email</h6>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <button>SIGN ME UP!</button>
            </form>
          </div>
        </div>
        <div className={newsletterStyles.newsletterContent}>
          <img
            src="/newletter1.webp"
            alt="community"
            loading="lazy"
            className={newsletterStyles.newsletterItemImage}
          />
        </div>
        <div className={newsletterStyles.newsletterContent}>
          <img
            src="/newletter2.webp"
            alt="community"
            loading="lazy"
            className={newsletterStyles.newsletterItemImage}
          />
        </div>
      </div>
    </div>
  );
};
