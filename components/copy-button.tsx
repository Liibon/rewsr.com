"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { motion } from "framer-motion"

interface CopyButtonProps {
  textToCopy: string
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="bg-muted/50 dark:bg-muted/20 border border-border p-3 pl-4 pr-3 flex items-center justify-between w-full max-w-md font-mono text-sm text-left text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="text-foreground select-all">{`$ ${textToCopy}`}</span>
      <motion.div whileTap={{ scale: 0.9 }}>
        {isCopied ? <Check size={16} className="text-[#E8A0BF]" /> : <Copy size={16} />}
      </motion.div>
    </button>
  )
}
