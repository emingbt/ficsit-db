export default function PrivacyPolicyPage() {
  return (
    <main className="w-full min-h-screen p-4 bg-dark-bg">
      <div className="w-full bg-main-bg p-6 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy for Ficsit DB</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Ficsit DB ("we", "our", "us") respects your privacy and is committed to protecting your personal data.
            This privacy policy explains how we collect, use, store, and protect your information when you visit our website,
            https://www.ficsitdb.app ("Site").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Data Collection</h2>
          <p>We collect the following types of personal information:</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Email address</strong>: Collected during user registration via email or through the "Continue with Google" option for authentication.</li>
            <li><strong>Cookies and Tracking</strong>: We use cookies to enhance your experience and for analytical purposes. These may include functional and analytical cookies.</li>
          </ul>
          <p>We do not collect any sensitive personal information, nor do we target or collect information from users under 18.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Purpose of Data Collection</h2>
          <p>
            We collect and use your personal data to:
          </p>
          <ul className="list-disc ml-6">
            <li>Authenticate users and manage accounts.</li>
            <li>Improve the functionality and user experience of the Site.</li>
            <li>Send relevant updates about Ficsit DB and your account.</li>
            <li>Analyze website traffic and usage through tools like Google Analytics.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage</h2>
          <p>
            Your data is stored securely using third-party services:
          </p>
          <ul className="list-disc ml-6">
            <li><strong>Neon Database</strong>: Located in Frankfurt, Germany, where user emails are stored.</li>
            <li><strong>Cloudinary</strong>: Used for storing images and files uploaded by users.</li>
          </ul>
          <p>
            We will keep your information secure by taking appropriate technical and organizational measures
            against unauthorized or unlawful processing, as well as accidental loss, destruction, or damage.
            However, we cannot guarantee the security of data transmitted over the internet.
            If you believe your account has been compromised, please contact us immediately at ficsitdb@gmail.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p>
            We retain your data until you request its deletion. Users can manage or delete their uploaded files
            directly on the Site. For account deletion, you may email us at ficsitdb@gmail.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p>
            We use the following third-party services:
          </p>
          <ul className="list-disc ml-6">
            <li><strong>Google Analytics</strong>: Tracks user interactions with the Site (e.g., location, pages viewed). While no personal data is intentionally shared, some user interaction details may be visible through Google Analytics.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies, Analytics, and Traffic Data</h2>
          <p>
            Cookies are small text files that are transferred from our website and stored on your device. We use cookies to provide you with a personalized experience and to improve the functionality of our website.
          </p>
          <p>Our cookies may be either:</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Session cookies</strong>: Temporary cookies that track users during their visit to our website and are deleted when you close your browser.</li>
            <li><strong>Persistent cookies</strong>: Cookies that allow us to "remember" you and your preferences, which remain on your device after you close your browser.</li>
          </ul>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Strictly Necessary Cookies</strong>: These are essential for the functioning of our website, including login and account authentication through Kinde.</li>
            <li><strong>Performance Cookies and Analytics Technologies</strong>: These cookies help us understand how visitors use our website. For example, Google Analytics allows us to see page views and site performance. These cookies do not collect identifiable information, and all data is aggregated.</li>
            <li><strong>Targeting or Advertising Cookies</strong>: Google AdSense uses these cookies to deliver relevant ads based on user interests. If you do not wish to receive personalized ads, you can opt-out through Google Ads settings.</li>
          </ul>
          <p><strong>Web Beacons and Parameter Tracking</strong>: We may use web beacons to track users who visit our website after clicking on an advertisement. You can disable these by blocking cookies in your browser settings.</p>
          <p><strong>IP Address and Traffic Data</strong>: Our servers log traffic data such as your IP address, device information, and the website you visited before ours. We also collect site statistics like access rates, but this data does not identify individual users.</p>
          <p><strong>How to Disable Cookies</strong>: You can configure your browser to restrict or block cookies. However, disabling cookies may affect your ability to use certain features of our website. For more information on managing cookies, visit <a href="https://www.allaboutcookies.org" className="text-main-orange hover:underline">www.allaboutcookies.org</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Security and Storage of Information</h2>
          <p>
            We are committed to keeping your information secure by implementing appropriate technical and organizational measures to protect it from unauthorized or unlawful processing, as well as accidental loss, destruction, or damage.
          </p>
          <p>
            While we strive to protect your personal information, we cannot guarantee the security of data transmitted over the internet or similar networks.
            If you believe your account has been compromised, please contact us immediately at ficsitdb@gmail.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Your Rights and Data Protection</h2>
          <p>If you are based within the EEA or another jurisdiction with similar data protection laws, you have the following rights:</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Right to Access</strong>: You can request access to your personal data and obtain a copy of the information we hold about you.</li>
            <li><strong>Right to Rectification</strong>: You can request corrections to any inaccurate or incomplete personal data.</li>
            <li><strong>Right to Erasure ("Right to be Forgotten")</strong>: You can request that we delete your personal data when it is no longer necessary, or if you withdraw consent.</li>
            <li><strong>Right to Data Portability</strong>: You can receive your personal data in a structured, commonly used, and machine-readable format, and transmit it to another controller.</li>
            <li><strong>Right to Object</strong>: You can object to the processing of your personal data in certain situations, such as for direct marketing.</li>
            <li><strong>Right to Restrict Processing</strong>: You can request the restriction of processing of your personal data in certain circumstances.</li>
            <li><strong>Right to Withdraw Consent</strong>: If you withdraw your consent for the processing of your personal information, we may not be able to provide you with access to all or parts of our website or services.</li>
          </ul>
          <p>
            We will retain your personal information for the duration of our business relationship and for as long as necessary for our legitimate business purposes, in accordance with our data retention and destruction policies, or as required by applicable laws and regulations. When your personal information is no longer needed, we will dispose of it securely without further notice to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Data Transfers Outside the European Economic Area (EEA)</h2>
          <p>
            Personal data in the EEA is protected by strict privacy laws. However, we may transfer your data to other countries, including the United States, that do not have the same data protection standards.
          </p>
          <p>
            Our website, services, and some applications may be hosted in the United States or other countries outside the EEA. When you interact with our website or services, your data may be transferred outside the EEA. We take appropriate steps to ensure that any transfer of your personal data is safeguarded in compliance with GDPR and other relevant regulations. This includes using legally-approved mechanisms, such as the European Commission’s Standard Contractual Clauses, for transferring data outside the EEA.
          </p>
          <p>
            By using our website and services, you consent to the transfer of your data outside the EEA. If you do not wish for your data to be transferred outside of the EEA, please refrain from using our services.
          </p>
        </section>


        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
          <p>
            Our Site does not target children, and we do not knowingly collect data from users under 18. If you believe we have unintentionally collected such data, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or how your data is handled,
            please contact us at ficsitdb@gmail.com.
          </p>
        </section>
      </div>
    </main>
  )
}
