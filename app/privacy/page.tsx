import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-8 px-8 md:px-16 lg:px-24 border-b border-border flex items-center">
        <Link
          href="/"
          className="font-mono text-2xl font-bold tracking-tighter text-foreground flex items-center group"
        >
          <ArrowLeft size={20} className="mr-3 transform group-hover:-translate-x-1 transition-transform" />
          <Logo size="sm" linkWrapper={false} />
        </Link>
      </header>

      <main className="flex-1 py-16 px-8 md:px-16 lg:px-24 max-w-4xl mx-auto">
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-16">
          Privacy Policy
        </h1>

        <div className="space-y-12 font-mono text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Data Collection</h2>
            <p className="text-base leading-relaxed">
              rewsr collects information necessary to provide our services, including but not limited to company
              information, contact details, and asset specifications. We do not collect personal data from end-users of
              client devices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Use of Information</h2>
            <p className="text-base leading-relaxed">
              Information collected is used solely for providing and improving our services, including asset tracking,
              value recovery reporting, and compliance documentation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Data Security</h2>
            <p className="text-base leading-relaxed">
              rewsr implements appropriate technical and organizational measures to protect your information. All data
              security services comply with industry standards and relevant guidelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Data Retention</h2>
            <p className="text-base leading-relaxed">
              We retain client information for as long as necessary to provide our services and comply with legal
              obligations. Asset records are maintained for a minimum of 7 years to ensure compliance with regulations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Third-Party Disclosure</h2>
            <p className="text-base leading-relaxed">
              rewsr does not sell your information to third parties. We may share information with trusted partners who
              assist us in operating our platform and servicing clients, subject to confidentiality agreements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Compliance Certificates</h2>
            <p className="text-base leading-relaxed">
              Upon request, rewsr provides certificates of completion and compliance for all processed assets. These
              certificates contain only the information necessary for regulatory compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Client Rights</h2>
            <p className="text-base leading-relaxed">
              Clients have the right to access, correct, or delete their information, subject to our legal obligations
              to maintain certain records. To exercise these rights, contact{" "}
              <a href="mailto:privacy@rewsr.com" className="text-[#E8A0BF] hover:underline">
                privacy@rewsr.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Cookies and Tracking</h2>
            <p className="text-base leading-relaxed">
              Our website uses minimal cookies necessary for functionality. We do not use cookies for advertising
              purposes or track user behavior beyond what is required for service improvement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Policy Updates</h2>
            <p className="text-base leading-relaxed">
              This privacy policy may be updated periodically. We will notify clients of significant changes via email
              or through our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">10. Contact Information</h2>
            <p className="text-base leading-relaxed">
              For privacy-related inquiries, contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@rewsr.com" className="text-[#E8A0BF] hover:underline">
                privacy@rewsr.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="py-10 px-8 md:px-16 lg:px-24 border-t border-border font-mono text-xs text-muted-foreground flex justify-between">
        <a href="mailto:hello@rewsr.com" className="hover:text-[#E8A0BF] transition-colors duration-300">
          hello@rewsr.com
        </a>
        <div className="flex gap-8">
          <Link href="/legal" className="hover:text-[#E8A0BF] transition-colors duration-300">
            Terms
          </Link>
          <Link href="/privacy" className="text-[#E8A0BF] transition-colors duration-300">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  )
}
