export default function DevPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex items-center gap-12">
        {/* Rewsr Logo */}
        <div className="flex-shrink-0">
          <img src="/images/rewsr-logo.png" alt="Rewsr" className="h-24 w-auto" />
        </div>

        {/* X Symbol */}
        <div className="text-white text-4xl font-light">×</div>

        <div className="flex-shrink-0">
          <img src="/images/jll-logo.png" alt="JLL" className="h-16 w-auto" />
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <p className="text-white text-xl font-light tracking-wide">Partnership Secured</p>
      </div>
    </div>
  )
}
