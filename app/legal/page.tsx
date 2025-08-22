import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function LegalPage() {
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
          Terms of Service
        </h1>

        <div className="space-y-12 font-mono text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed">
              By accessing or using rewsr services, you agree to be bound by these Terms of Service. If you do not agree
              to these terms, do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Services Description</h2>
            <p className="text-base leading-relaxed">
              rewsr provides enterprise asset management services, including but not limited to asset transition, data
              security, and value recovery solutions for organizations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. User Responsibilities</h2>
            <p className="text-base leading-relaxed">
              You are responsible for providing accurate information about your assets. You warrant that you have the
              legal right to transfer all assets submitted to rewsr.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
            <p className="text-base leading-relaxed">
              rewsr employs industry-standard data protection methods. However, you are responsible for removing all
              sensitive data from your devices before submission unless explicitly contracting rewsr for data security
              services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Compliance</h2>
            <p className="text-base leading-relaxed">
              All asset transition activities conducted by rewsr comply with relevant regulations. We maintain all
              necessary certifications for proper handling and processing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
            <p className="text-base leading-relaxed">
              rewsr's liability is limited to the value of the services contracted. We are not liable for any indirect,
              consequential, or incidental damages arising from the use of our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Modifications to Terms</h2>
            <p className="text-base leading-relaxed">
              rewsr reserves the right to modify these terms at any time. Continued use of our services after such
              modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Governing Law</h2>
            <p className="text-base leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the jurisdiction in which rewsr
              is registered, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Contact</h2>
            <p className="text-base leading-relaxed">
              For questions regarding these terms, contact us at{" "}
              <a href="mailto:legal@rewsr.com" className="text-[#E8A0BF] hover:underline">
                legal@rewsr.com
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
          <Link href="/legal" className="text-[#E8A0BF] transition-colors duration-300">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[#E8A0BF] transition-colors duration-300">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  )
}
