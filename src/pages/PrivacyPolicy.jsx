const PrivacyPolicy = () => {
  return (
    <div className="px-4">
      <section className="relative pt-32 py-16 dark:bg-jacarta-800 md:py-24">
        <div className="">
          <h1 className="text-center font-display text-2xl lg:text-4xl font-bold text-gray-700 dark:text-white">
            Privacy Policy – Book A Crib
          </h1>
          <div className="article-content mx-auto max-w-[48.125rem]">
            {/* <h2 className="">Introduction</h2> */}
            <p className=" font-semibold">Effective Date: 1st June, 2025</p>
            <p>
              At www.bookacrib.com, your privacy is important to us. This
              Privacy Policy explains how we collect, use, and protect your
              information when you use our website and services.
            </p>
            <h4>1. Information We Collect</h4>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <b>Personal Information:</b> Name, email address, phone number,
                payment details, and ID verification documents.
              </li>
              <li>
                <b>Booking Information: </b> Property preferences, travel dates,
                and transaction history.
              </li>
              <li>
                <b>Technical Information:</b> IP address, browser type, device
                information, cookies, and usage data.
              </li>
            </ul>
            <h4>2. How We Use Your Information</h4>
            <p>We use your information to:</p>
            <ul>
              <li>Process bookings and payments</li>
              <li>Communicate with you about your account and reservations</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            <h4>3. Sharing Your Information</h4>
            <p>
              We do not sell your personal information. We may share your data
              with:
            </p>
            <ul>
              <li>
                Property owners/hosts for the purpose of completing bookings
              </li>
              <li>Third-party service providers (e.g., payment processors)</li>
              <li>Legal authorities, where required by law</li>
            </ul>
            <h4>4. Data Retention</h4>
            <p>
              We retain your personal data only as long as necessary to fulfill
              the purposes outlined in this policy, unless a longer retention
              period is required by law.
            </p>
            <h4>5. Your Rights</h4>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <h4>6. Cookies</h4>
            <p>
              We use cookies to enhance your experience. You may choose to
              disable cookies through your browser settings, but some features
              of our website may not function properly.
            </p>

            <h4>7. Security</h4>
            <p>
              We implement reasonable security measures to protect your
              information from unauthorized access or disclosure.
            </p>
            <h4>8. Contact Us</h4>
            <p>
              If you have any questions, contact us at:{" "}
              <a className="underline" href="mailto:privacy@bookacrib.com">
                privacy@bookacrib.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
