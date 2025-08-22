"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  href?: string
  linkWrapper?: boolean
}

export function Logo({ size = "md", withText = true, href = "/", linkWrapper = true }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
  }

  const logoSize = sizes[size]

  const LogoContent = () => (
    <div className="flex items-center">
      <div className="relative">
        <Image src="/logo.png" alt="rewsr logo" width={logoSize} height={logoSize} className="object-contain" />
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 bg-[#E8A0BF]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {withText && (
        <span className="font-mono text-2xl font-bold tracking-tighter text-white ml-3">
          rewsr<span className="text-[#E8A0BF] text-opacity-80">.</span>
        </span>
      )}
    </div>
  )

  if (href && linkWrapper) {
    return (
      <Link href={href} className="inline-flex">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}
