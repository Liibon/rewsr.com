"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function GPUTEEThoughtPage() {
  return (
    <div className="min-h-screen bg-black text-[#E8A0BF] relative overflow-hidden font-mono">
      {/* Terminal-style scanlines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-scanline opacity-5"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-[#E8A0BF] opacity-5"
            style={{
              top: `${i * 2}%`,
              left: 0,
              right: 0,
              animation: `flicker ${2 + Math.random() * 3}s infinite`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-[#E8A0BF]/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/research" className="flex items-center group">
            <ArrowLeft
              size={20}
              className="mr-3 transform group-hover:-translate-x-1 transition-transform text-[#E8A0BF]"
            />
            <Logo size="sm" linkWrapper={false} />
          </Link>
          <div className="text-xs text-[#E8A0BF]/60">THOUGHT.LOG</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#E8A0BF] mb-4 leading-tight">GPU TEEs and the AWS Headache</h1>
            <div className="text-[#E8A0BF]/60 text-sm mb-8">
              <span className="mr-4">2025.01.21</span>
              <span className="mr-4">ANANSI.ALPHA</span>
              <span>CONFIDENTIAL.COMPUTE</span>
            </div>
          </div>

          <div className="space-y-8 text-lg leading-relaxed">
            <p>ok so this has been driving me nuts for weeks now</p>

            <p>
              AWS drops these new P6 instances with Blackwell GPUs and they're <em>insanely</em> fast. like we're
              talking about exactly what I need for Anansi's proof generation stuff. should be perfect right?
            </p>

            <p>
              except here's the thing that makes me want to throw my laptop out the window.{" "}
              <strong className="text-[#E8A0BF]">they didn't expose ANY gpu tee controls</strong>. none. zero. nothing
              in the docs about encrypted HBM, no gpu attestation api that customers can actually use. it's like they
              built this amazing race car but forgot to include the steering wheel
            </p>

            <p>
              meanwhile azure has had confidential gpus working for months. MONTHS. their NCCads H100 v5 instances give
              you cpu AND gpu attestation right out of the box. they literally have a github repo that walks you through
              the whole thing. i can spin one up right now and get attestation tokens in like 10 minutes
            </p>

            <p>
              google cloud? same deal. A3 confidential VMs with H100s, nvidia NRAS attestation, the whole nine yards. it
              just works
            </p>

            <div className="border-l-4 border-[#E8A0BF] pl-6 my-12 bg-[#E8A0BF]/5 py-6">
              <p className="text-[#E8A0BF] font-semibold text-xl">seriously AWS what are you doing</p>
              <p className="mt-4 text-[#E8A0BF]/80">
                your competitors are shipping actual confidential computing features while you're over here writing blog
                posts about how fast your new gpus are. cool story but enterprises need more than speed benchmarks
              </p>
            </div>

            <div className="my-16 relative">
              <motion.div
                className="relative overflow-hidden rounded-lg border border-[#E8A0BF]/30"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-21%20at%2012.54.29%E2%80%AFAM.png-wqoKOTQ2k5OBqplyhkcp0D8c4tIF2V.jpeg"
                  alt="F1 pit stop with AWS branding"
                  className="w-full h-auto filter brightness-75 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#E8A0BF] font-semibold text-lg mb-2">this is what i'm talking about</p>
                  <p className="text-[#E8A0BF]/80 text-sm">
                    every single piece working together perfectly. no missing parts, no "oh we'll add that later"
                    <br />
                    <em>that's what cloud infrastructure should look like too</em>
                  </p>
                </div>
              </motion.div>
            </div>

            <p>
              but whatever, can't sit around waiting for AWS to figure it out. so here's what we're actually doing for
              anansi alpha
            </p>

            <h2 className="text-2xl font-bold text-[#E8A0BF] mt-16 mb-8 border-b border-[#E8A0BF]/30 pb-4">
              the hack that actually works
            </h2>

            <p>
              two cloud MPC. sounds fancy but it's pretty straightforward. we use AWS P6 instances for the raw compute
              power because yeah they're stupid fast. but we keep everything confidential by doing multi party
              computation with azure or gcp confidential gpus
            </p>

            <p>
              basically your data never exists in cleartext on any single cloud. each one only sees random garbage that
              looks like noise. even if AWS could somehow peek at the gpu memory (which they probably can't but still)
              all they'd see is meaningless random numbers
            </p>

            <div className="bg-black border border-[#E8A0BF]/30 p-6 my-8 rounded">
              <h3 className="text-[#E8A0BF] font-semibold mb-4">here's the setup:</h3>
              <ul className="space-y-3 text-[#E8A0BF]/90">
                <li>AWS side: P6-B200 for speed (obviously)</li>
                <li>other cloud: azure NCCads H100 v5 or gcp A3 confidential</li>
                <li>secret sharing: both gpus work on shares, never see actual data</li>
                <li>attestation: azure/gcp gives us proper gpu attestation via NRAS</li>
                <li>aws side: nitro enclave handles keys and policy stuff</li>
              </ul>
            </div>

            <p>
              the proof bundle we spit out has everything. azure/gcp cpu attestation, gpu NRAS tokens, aws nitro enclave
              attestation, mpc protocol transcripts. boom. cryptographic proof that no single cloud provider ever saw
              your secrets
            </p>

            <p>
              and here's the kicker - even if AWS could somehow read the pcie bus or gpu memory, doesn't matter. they're
              only seeing random shares that are useless without the other half
            </p>

            <h2 className="text-2xl font-bold text-[#E8A0BF] mt-16 mb-8 border-b border-[#E8A0BF]/30 pb-4">
              why this isn't just paranoia
            </h2>

            <p>
              look i know this sounds like overkill. "just trust the cloud provider" right? except when you're dealing
              with enterprises running their most sensitive AI workloads, trust isn't enough anymore
            </p>

            <p>
              i've been in meetings with compliance teams. they don't want to hear about your security promises or your
              certifications. they want cryptographic proof. they want attestation tokens they can verify themselves.
              they want audit trails that would hold up if things go sideways
            </p>

            <p>
              that's exactly what anansi gives them. every single computation comes with a proof bundle that anyone can
              verify independently. no trust required
            </p>

            <div className="border border-[#E8A0BF]/30 p-8 my-12 bg-[#E8A0BF]/5">
              <p className="text-[#E8A0BF] text-xl font-semibold mb-4">bottom line</p>
              <p className="text-[#E8A0BF]/90">
                aws has the fastest hardware but no confidential computing story. azure and gcp have confidential
                computing but slower gpus. so we just use both. problem solved
              </p>
            </div>

            <p>
              this is what's shipping in anansi alpha. code's gonna be open source soon so you can see exactly how we're
              doing it. and hey if anyone from aws is reading this - please just expose those gpu tee controls already.
              would make all our lives easier
            </p>

            <p className="text-[#E8A0BF]/60 text-base mt-16 pt-8 border-t border-[#E8A0BF]/30">
              <em>
                anyway that's how we're solving confidential ai compute right now. not waiting around for perfect
                solutions, just building what works with what we've got
              </em>
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  )
}
