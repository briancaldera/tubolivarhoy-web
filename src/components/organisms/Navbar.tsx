import { useState } from "react"
import Link from "@/components/atoms/Link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-linear-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
                Tu Bolívar Hoy
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share" className="text-gray-700 hover:text-primary-end transition-colors">
              Consigue la app
            </Link>
            <Link href="/#features" className="text-gray-700 hover:text-primary-end transition-colors">
              Funcionalidades
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share"
              className="bg-linear-to-r from-primary-start to-primary-end text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Descargar
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-end focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share"
              className="block text-gray-700 hover:text-primary-end transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Consigue la app
            </Link>
            <Link
              href="/#features"
              className="block text-gray-700 hover:text-primary-end transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share"
              className="block bg-linear-to-r from-primary-start to-primary-end text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Descargar
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

