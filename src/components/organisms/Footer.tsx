import Link from "@/components/atoms/Link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Play } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
                Tu Bolívar Hoy
              </span>
            </Link>
            <p className="text-gray-600">La forma más sencilla de convertir divisas y realizar un seguimiento de los tipos de cambio.</p>
            <div className="flex space-x-4">
              <Link href="https://play.google.com/store/apps/dev?id=5515021505297833447" className="text-gray-400 hover:text-primary-end transition-colors" target="_blank" aria-label='PlayStore link'>
                <Play size={20} />
              </Link>
              <Link href="https://www.instagram.com/brianc.dev/" className="text-gray-400 hover:text-primary-end transition-colors" target="_blank" aria-label='Instagram link'>
                <Instagram size={20} />
              </Link>
              <Link href="https://www.linkedin.com/in/brian-caldera-724049244" className="text-gray-400 hover:text-primary-end transition-colors" target="_blank" aria-label='LinkedIn link'>
                <Linkedin size={20} />
              </Link>
              <Link href="https://github.com/briancaldera" className="text-gray-400 hover:text-primary-end transition-colors" target="_blank" aria-label='GitHub link'>
                <Github size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">App</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tubolivarhoy#features" className="text-gray-600 hover:text-primary-end transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="https://play.google.com/store/apps/details?id=com.briancaldera.tubolivarhoy&pcampaignid=web_share" className="text-gray-600 hover:text-primary-end transition-colors">
                  Descargar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Desarrollador</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://briancaldera.com" className="text-gray-600 hover:text-primary-end transition-colors">
                  Acerca de mí
                </Link>
              </li>
              <li>
                <Link href="mailto:briancaldera07+support@gmail.com" className="text-gray-600 hover:text-primary-end transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tubolivarhoy/terms" className="text-gray-600 hover:text-primary-end transition-colors">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="/tubolivarhoy/privacy" className="text-gray-600 hover:text-primary-end transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/tubolivarhoy/refunds" className="text-gray-600 hover:text-primary-end transition-colors">
                  Reembolso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          {/* <p>© {new Date().getFullYear()} Brian Caldera. Todos los derechos reservados.</p> */}
          <p className="pt-4"><span className="font-black text-primary-start">&lt;&gt;</span> con <a href="https://youtu.be/UyQm4O9G7OM?feature=shared" target="_blank">❤️</a> por <a href="https://briancaldera.com/" className="text-primary-end font-bold">Brian Caldera</a></p>
        </div>
      </div>
    </footer>
  )
}

