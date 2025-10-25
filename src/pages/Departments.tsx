import { useState } from "react";
import { Plus, Building, Search, AlertTriangle } from "lucide-react";
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

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    {
      id: "1",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Recursos Humanos",
      code: "RH",
      description: "Gestão de pessoas e recrutamento",
      managerId: "user-001",
      managerName: "Maria Silva",
      employeeCount: 25,
      riskLevel: "Low",
      status: "Active",
      createdAt: "2024-01-20"
    },
    {
      id: "2",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Tecnologia da Informação",
      code: "TI",
      description: "Infraestrutura e desenvolvimento",
      managerId: "user-002",
      managerName: "João Santos",
      employeeCount: 120,
      riskLevel: "Critical",
      status: "Active",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Financeiro",
      code: "FIN",
      description: "Contabilidade e finanças corporativas",
      managerId: "user-003",
      managerName: "Ana Costa",
      employeeCount: 40,
      riskLevel: "High",
      status: "Active",
      createdAt: "2024-01-20"
    },
    {
      id: "4",
      organizationId: "2",
      organizationName: "FinBank Digital",
      name: "Segurança da Informação",
      code: "INFOSEC",
      description: "Proteção de dados e compliance",
      managerId: "user-004",
      managerName: "Carlos Mendes",
      employeeCount: 35,
      riskLevel: "Critical",
      status: "Active",
      createdAt: "2024-02-25"
    },
    {
      id: "5",
      organizationId: "3",
      organizationName: "HealthCare Plus",
      name: "Atendimento",
      code: "ATD",
      description: "Suporte ao paciente",
      managerId: "user-005",
      managerName: "Paula Souza",
      employeeCount: 60,
      riskLevel: "Medium",
      status: "Active",
      createdAt: "2024-03-15"
    }
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departamentos</h1>
          <p className="text-muted-foreground mt-1">
            Estrutura departamental das organizações
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Departamento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Departamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Nível Crítico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">280</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Média por Depto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Departamentos</CardTitle>
              <CardDescription>Estrutura organizacional por departamento</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar departamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead>Organização</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Gerente</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead>Nível de Risco</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-sm text-muted-foreground">{dept.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{dept.organizationName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dept.code}</Badge>
                  </TableCell>
                  <TableCell>{dept.managerName}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{dept.employeeCount}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskBadgeColor(dept.riskLevel)}>
                      {dept.riskLevel === "Critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {dept.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={dept.status === "Active" ? "default" : "secondary"}>
                      {dept.status}
                    </Badge>
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

export default Departments;
