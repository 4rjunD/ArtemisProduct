import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-primary hover:underline text-sm mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="font-serif text-2xl mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Artemis ("we," "our," or "us") is committed to protecting the privacy of children and their families. This Privacy Policy explains how we collect, use, and safeguard information when you use our cognitive training platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Account Information:</strong> Parent email address, password, and payment information for subscription management.</li>
              <li><strong className="text-foreground">Child Profile Information:</strong> First name (or nickname), age, and grade level to personalize the learning experience.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Exercise completion, performance metrics, and progress data to track improvement and adjust difficulty.</li>
              <li><strong className="text-foreground">Device Information:</strong> Browser type, device type, and general location (country level) for technical support and service optimization.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">How We Use Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide and personalize the Artemis learning experience</li>
              <li>Generate progress reports for parents</li>
              <li>Improve our exercises and platform</li>
              <li>Communicate with parents about their account and our services</li>
              <li>Process payments and manage subscriptions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take children's privacy seriously. We do not collect more information from children than is necessary to provide our service. We do not use children's personal information for advertising purposes. Parents can review, update, or delete their child's information at any time through their account dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We do not sell personal information. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Service Providers:</strong> Third parties who help us operate our platform (payment processing, hosting, analytics)</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to keep you logged in and remember your preferences. We do not use advertising or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or through a notice on our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our practices, please contact us at{" "}
              <a href="mailto:privacy@artemis.com" className="text-primary hover:underline">privacy@artemis.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
