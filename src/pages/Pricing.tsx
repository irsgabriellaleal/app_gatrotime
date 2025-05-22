import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 99",
    period: "/mês",
    description: "Perfeito para pequenos restaurantes que estão começando",
    features: [
      "Até 3 usuários",
      "Cardápio digital básico",
      "Gestão de pedidos",
      "Suporte por email",
      "Relatórios básicos",
    ],
  },
  {
    id: "profissional",
    name: "Profissional",
    price: "R$ 199",
    period: "/mês",
    description: "Ideal para restaurantes em crescimento",
    features: [
      "Até 10 usuários",
      "Cardápio digital avançado",
      "Gestão de pedidos e reservas",
      "Suporte prioritário",
      "Relatórios avançados",
      "Integração com iFood",
      "App para clientes",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 399",
    period: "/mês",
    description: "Solução completa para grandes restaurantes",
    features: [
      "Usuários ilimitados",
      "Cardápio digital premium",
      "Gestão completa de pedidos e reservas",
      "Suporte 24/7",
      "Relatórios personalizados",
      "Integração com múltiplos marketplaces",
      "App para clientes premium",
      "API personalizada",
    ],
  },
];

export function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Planos
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Escolha o plano ideal para seu restaurante
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Oferecemos planos flexíveis para atender às necessidades do seu
          negócio, desde pequenos restaurantes até grandes redes.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                plan.popular
                  ? "relative z-10 shadow-lg ring-2 ring-indigo-600"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white">
                  Mais popular
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    className={`text-lg font-semibold leading-8 ${
                      plan.popular ? "text-indigo-600" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {plan.period}
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => navigate(`/checkout/${plan.id}`)}
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                Começar agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
