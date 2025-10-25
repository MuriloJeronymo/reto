import { useState } from "react";
import { Plus, Shield, Search, FileText, AlertCircle, CheckCircle } from "lucide-react";
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

const SecurityPolicies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const policies = [
    {
      id: "1",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Política de Senhas Fortes",
      description: "Requisitos mínimos para senhas corporativas",
      policyType: "Password",
      rules: {
        minLength: 12,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expirationDays: 90
      },
      enforcementLevel: "Mandatory",
      appliesTo: "All",
      effectiveDate: "2024-01-01",
      expiryDate: "2024-12-31",
      version: "2.0",
      approvedBy: "Maria Silva - CISO",
      createdAt: "2023-12-15"
    },
    {
      id: "2",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Controle de Acesso a Dados Sensíveis",
      description: "Restrições de acesso a informações confidenciais",
      policyType: "Access",
      rules: {
        mfaRequired: true,
        logAllAccess: true,
        maxIdleMinutes: 15,
        dataClassification: "Confidential"
      },
      enforcementLevel: "Critical",
      appliesTo: "Departments",
      effectiveDate: "2024-02-01",
      expiryDate: null,
      version: "1.5",
      approvedBy: "João Santos - CTO",
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      organizationId: "2",
      organizationName: "FinBank Digital",
      name: "Política de Email Seguro",
      description: "Diretrizes para uso seguro de email corporativo",
      policyType: "Email",
      rules: {
        blockExternalForwarding: true,
        encryptSensitive: true,
        phishingProtection: "Advanced",
        attachmentSizeLimit: "25MB"
      },
      enforcementLevel: "Mandatory",
      appliesTo: "All",
      effectiveDate: "2024-01-15",
      expiryDate: "2024-12-31",
      version: "3.0",
      approvedBy: "Carlos Mendes - Head of Security",
      createdAt: "2024-01-10"
    },
    {
      id: "4",
      organizationId: "2",
      organizationName: "FinBank Digital",
      name: "Proteção de Dados - LGPD",
      description: "Conformidade com requisitos da LGPD",
      policyType: "Data",
      rules: {
        dataRetentionYears: 5,
        consentRequired: true,
        rightToDelete: true,
        encryptionRequired: "AES-256"
      },
      enforcementLevel: "Critical",
      appliesTo: "All",
      effectiveDate: "2024-01-01",
      expiryDate: null,
      version: "1.0",
      approvedBy: "Diretoria Executiva",
      createdAt: "2023-12-01"
    },
    {
      id: "5",
      organizationId: "3",
      organizationName: "HealthCare Plus",
      name: "Acesso Remoto Seguro",
      description: "Requisitos para trabalho remoto",
      policyType: "Access",
      rules: {
        vpnRequired: true,
        deviceCompliance: true,
        antivirusRequired: true,
        allowedCountries: ["BR"]
      },
      enforcementLevel: "Mandatory",
      appliesTo: "Roles",
      effectiveDate: "2024-03-01",
      expiryDate: "2024-12-31",
      version: "1.2",
      approvedBy: "Paula Souza - IT Manager",
      createdAt: "2024-02-15"
    }
  ];

  const getEnforcementColor = (level: string) => {
    switch (level) {
      case "Critical": return "bg-red-500";
      case "Mandatory": return "bg-orange-500";
      case "Advisory": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getPolicyTypeIcon = (type: string) => {
    switch (type) {
      case "Password": return "🔐";
      case "Access": return "🚪";
      case "Email": return "📧";
      case "Data": return "💾";
      default: return "📋";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Políticas de Segurança</h1>
          <p className="text-muted-foreground mt-1">
            Regras e requisitos de segurança organizacional
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Política
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Políticas</CardTitle>
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
            <CardTitle className="text-sm font-medium">Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Expiram Este Ano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Políticas Cadastradas</CardTitle>
              <CardDescription>Regras de segurança por organização</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar políticas..."
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
                <TableHead>Política</TableHead>
                <TableHead>Organização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Aplica-se a</TableHead>
                <TableHead>Vigência</TableHead>
                <TableHead>Versão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => {
                const isActive = new Date(policy.effectiveDate) <= new Date();
                const isExpired = policy.expiryDate && new Date(policy.expiryDate) < new Date();

                return (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getPolicyTypeIcon(policy.policyType)}</span>
                        <div>
                          <div className="font-medium">{policy.name}</div>
                          <div className="text-sm text-muted-foreground">{policy.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{policy.organizationName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{policy.policyType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEnforcementColor(policy.enforcementLevel)}>
                        {policy.enforcementLevel === "Critical" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {policy.enforcementLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{policy.appliesTo}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Início: {new Date(policy.effectiveDate).toLocaleDateString()}</div>
                        {policy.expiryDate && (
                          <div className="text-muted-foreground">
                            Fim: {new Date(policy.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">v{policy.version}</Badge>
                    </TableCell>
                    <TableCell>
                      {isExpired ? (
                        <Badge variant="destructive">Expirada</Badge>
                      ) : isActive ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ativa
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pendente</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver Detalhes</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPolicies;
