import { useState } from "react";
import { Plus, Building2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");

  const organizations = [
    {
      id: "1",
      name: "TechCorp Solutions",
      legalName: "TechCorp Solutions LTDA",
      taxId: "12.345.678/0001-90",
      industry: "Tecnologia",
      size: "Enterprise",
      contactEmail: "contato@techcorp.com",
      contactPhone: "(11) 98765-4321",
      subscriptionPlan: "Enterprise",
      maxCampaigns: 100,
      maxUsers: 500,
      complianceRequirements: "LGPD, GDPR",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "FinBank Digital",
      legalName: "Financeira Digital Banco S.A.",
      taxId: "23.456.789/0001-01",
      industry: "Financeiro",
      size: "Large",
      contactEmail: "seguranca@finbank.com.br",
      contactPhone: "(11) 3456-7890",
      subscriptionPlan: "Pro",
      maxCampaigns: 50,
      maxUsers: 200,
      complianceRequirements: "LGPD, SOC2",
      createdAt: "2024-02-20"
    },
    {
      id: "3",
      name: "HealthCare Plus",
      legalName: "HealthCare Plus Medicina LTDA",
      taxId: "34.567.890/0001-12",
      industry: "Saúde",
      size: "Medium",
      contactEmail: "ti@healthcare.com",
      contactPhone: "(21) 2345-6789",
      subscriptionPlan: "Basic",
      maxCampaigns: 20,
      maxUsers: 50,
      complianceRequirements: "LGPD, HIPAA",
      createdAt: "2024-03-10"
    }
  ];

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "Enterprise": return "bg-purple-500";
      case "Pro": return "bg-blue-500";
      case "Basic": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie empresas clientes e suas configurações
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Organização
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Organizações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Organizações</CardTitle>
              <CardDescription>Empresas cadastradas na plataforma</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar organizações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organização</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Porte</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Limites</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-muted-foreground">{org.contactEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{org.taxId}</TableCell>
                  <TableCell>{org.industry}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.size}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanBadgeColor(org.subscriptionPlan)}>
                      {org.subscriptionPlan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{org.maxCampaigns} campanhas</div>
                      <div className="text-muted-foreground">{org.maxUsers} usuários</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">{org.complianceRequirements}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Ver Detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizations;
