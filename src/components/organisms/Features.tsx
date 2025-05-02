import { ArrowUpDown, Globe, Bell, Shield } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <ArrowUpDown className="w-10 h-10 text-primary-end" />,
      title: "Conversiones en Tiempo Real",
      description: "Usa la calculadora incluida para realizar conversiones rapidamente.",
    },
    {
      icon: <Globe className="w-10 h-10 text-primary-end" />,
      title: "Alcance Nacional",
      description: "Soporta las 5 monedas más usadas en el país.",
    },
    {
      icon: <Bell className="w-10 h-10 text-primary-end" />,
      title: "Notificaciones",
      description: "Recibe notificaciones en la pantalla de desbloqueo de tu dispositivo.",
    },
    {
      "icon": <Shield className="w-10 h-10 text-primary-end" />,
      "title": "Seguro y Privado",
      "description": "Tus datos permanecen en tu dispositivo. No se requiere cuenta."
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
              Funcionalidades
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesita para convertir bolívares a las divisas más populares en Venezuela.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

