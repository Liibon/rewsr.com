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

        {/* JLL Logo */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* JLL Worldmark Symbol */}
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
            </div>
            {/* JLL Text */}
            <div className="text-white font-bold text-3xl tracking-wider" style={{ fontFamily: "serif" }}>
              JLL
            </div>
          </div>
        </div>
      </div>

      {/* Pilot Secured Text */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <p className="text-white text-xl font-light tracking-wide">pilot secured</p>
      </div>
    </div>
  )
}
