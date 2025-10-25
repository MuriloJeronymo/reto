import { useState } from "react";
import { Plus, Users, Search, Shield } from "lucide-react";
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

const UserGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const groups = [
    {
      id: "1",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Administradores de TI",
      description: "Acesso total a sistemas e infraestrutura",
      permissions: {
        canCreateCampaigns: true,
        canViewReports: true,
        canManageUsers: true,
        canConfigureSystem: true,
        canAccessAPI: true
      },
      memberCount: 15,
      createdBy: "João Santos",
      createdAt: "2024-01-15",
      status: "Active"
    },
    {
      id: "2",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Gerentes de Campanha",
      description: "Criar e gerenciar campanhas de phishing",
      permissions: {
        canCreateCampaigns: true,
        canViewReports: true,
        canManageUsers: false,
        canConfigureSystem: false,
        canAccessAPI: false
      },
      memberCount: 45,
      createdBy: "Maria Silva",
      createdAt: "2024-01-20",
      status: "Active"
    },
    {
      id: "3",
      organizationId: "1",
      organizationName: "TechCorp Solutions",
      name: "Analistas de Segurança",
      description: "Visualizar relatórios e métricas",
      permissions: {
        canCreateCampaigns: false,
        canViewReports: true,
        canManageUsers: false,
        canConfigureSystem: false,
        canAccessAPI: false
      },
      memberCount: 28,
      createdBy: "Carlos Mendes",
      createdAt: "2024-02-01",
      status: "Active"
    },
    {
      id: "4",
      organizationId: "2",
      organizationName: "FinBank Digital",
      name: "Equipe de Compliance",
      description: "Auditoria e conformidade regulatória",
      permissions: {
        canCreateCampaigns: false,
        canViewReports: true,
        canManageUsers: false,
        canConfigureSystem: false,
        canAccessAPI: true
      },
      memberCount: 12,
      createdBy: "Ana Costa",
      createdAt: "2024-02-15",
      status: "Active"
    },
    {
      id: "5",
      organizationId: "3",
      organizationName: "HealthCare Plus",
      name: "Suporte Técnico",
      description: "Suporte aos usuários finais",
      permissions: {
        canCreateCampaigns: false,
        canViewReports: false,
        canManageUsers: false,
        canConfigureSystem: false,
        canAccessAPI: false
      },
      memberCount: 8,
      createdBy: "Paula Souza",
      createdAt: "2024-03-01",
      status: "Active"
    }
  ];

  const getPermissionCount = (permissions: any) => {
    return Object.values(permissions).filter(Boolean).length;
  };

  const getPermissionBadges = (permissions: any) => {
    const badges = [];
    if (permissions.canCreateCampaigns) badges.push("Criar Campanhas");
    if (permissions.canViewReports) badges.push("Ver Relatórios");
    if (permissions.canManageUsers) badges.push("Gerenciar Usuários");
    if (permissions.canConfigureSystem) badges.push("Configurar Sistema");
    if (permissions.canAccessAPI) badges.push("Acesso API");
    return badges;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grupos de Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Segmentação e permissões coletivas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Grupo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Membros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">108</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Média por Grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Grupos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Grupos</CardTitle>
              <CardDescription>Grupos com permissões específicas</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar grupos..."
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
                <TableHead>Grupo</TableHead>
                <TableHead>Organização</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => {
                const permissionCount = getPermissionCount(group.permissions);
                const permissionBadges = getPermissionBadges(group.permissions);

                return (
                  <TableRow key={group.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{group.name}</div>
                          <div className="text-sm text-muted-foreground">{group.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{group.organizationName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-lg">{group.memberCount}</div>
                        <span className="text-muted-foreground text-sm">usuários</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{permissionCount} permissões</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {permissionBadges.slice(0, 2).map((badge, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                          {permissionBadges.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{permissionBadges.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{group.createdBy}</div>
                        <div className="text-muted-foreground">
                          {new Date(group.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={group.status === "Active" ? "default" : "secondary"}>
                        {group.status}
                      </Badge>
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

export default UserGroups;
