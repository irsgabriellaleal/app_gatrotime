import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const plans = {
  basico: {
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
  profissional: {
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
  enterprise: {
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
};

export function CheckoutPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cnpj: "",
    telefone: "",
    endereco: "",
  });

  const selectedPlan = plans[planId as keyof typeof plans];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aqui você implementaria a integração com seu backend
      // e com o gateway de pagamento

      toast({
        title: "Assinatura realizada com sucesso!",
        description: "Você receberá um email com os próximos passos.",
      });

      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  if (!selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Plano não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finalizar Assinatura</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Plano</h2>
            {Boolean((selectedPlan as any).popular) && (
              <div className="mb-2 inline-block rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold text-white">
                Mais popular
              </div>
            )}
            <div className="space-y-2">
              <p className="text-lg font-medium">{selectedPlan.name}</p>
              <p className="text-sm text-gray-600 mb-2">
                {selectedPlan.description}
              </p>
              <p className="text-2xl font-bold">
                {selectedPlan.price}
                <span className="text-sm font-normal text-gray-600">
                  {selectedPlan.period}
                </span>
              </p>
              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                {selectedPlan.features?.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Restaurante</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) =>
                    setFormData({ ...formData, cnpj: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData({ ...formData, endereco: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Continuar para Assinatura
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
