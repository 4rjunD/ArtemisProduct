import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-primary hover:underline text-sm mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="font-serif text-2xl mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Artemis, you agree to be bound by these Terms of Service. If you are a parent or guardian creating an account for your child, you agree to these terms on behalf of yourself and your child.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Artemis is a cognitive training platform designed to help children develop independent thinking skills. Our service includes interactive exercises, progress tracking, and parent reporting tools. The service is intended for children ages 6-18 under parental supervision.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Account Registration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">To use Artemis, you must:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Be at least 18 years old (parents/guardians only)</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Have legal authority to create accounts for minors in your care</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Subscription and Payment</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Artemis offers subscription-based access to our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Subscriptions are billed monthly or annually as selected at signup</li>
              <li>All fees are in US dollars unless otherwise stated</li>
              <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Refunds are available within 30 days of purchase if you're not satisfied</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Share your account credentials with others</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use automated systems to access the service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on Artemis, including exercises, text, graphics, logos, and software, is owned by Artemis or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              Artemis is provided "as is" without warranties of any kind. We do not guarantee specific educational outcomes. Results may vary based on individual use, consistency, and other factors. Artemis is a supplement to, not a replacement for, formal education.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Artemis shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your account if you violate these terms. You may terminate your account at any time by cancelling your subscription and contacting us to delete your data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these terms at any time. We will notify you of significant changes via email or through the service. Continued use after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of Delaware.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@artemis.com" className="text-primary hover:underline">legal@artemis.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
