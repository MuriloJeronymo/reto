import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { Campaign } from "@/types";
import { mockCampaigns } from "@/data/mockUsers";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const CampaignCrud = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingCampaignId, setDeletingCampaignId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template_id: "",
    start_date: "",
    end_date: "",
    target_count: "",
    status: "draft"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      template_id: "",
      start_date: "",
      end_date: "",
      target_count: "",
      status: "draft"
    });
    setEditingCampaign(null);
  };

  const handleCreate = () => {
    setIsSheetOpen(true);
    resetForm();
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      description: campaign.description,
      template_id: "1",
      start_date: campaign.startDate,
      end_date: campaign.endDate,
      target_count: campaign.impressions.toString(),
      status: campaign.status
    });
    setIsSheetOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingCampaignId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingCampaignId) {
      setCampaigns(campaigns.filter(c => c.id !== deletingCampaignId));
      toast.success("Campanha excluída com sucesso!");
      setIsDeleteDialogOpen(false);
      setDeletingCampaignId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCampaign) {
      setCampaigns(campaigns.map(c =>
        c.id === editingCampaign.id
          ? {
              ...c,
              name: formData.name,
              description: formData.description,
              startDate: formData.start_date,
              endDate: formData.end_date,
              status: formData.status as "active" | "completed" | "paused" | "draft",
              impressions: parseInt(formData.target_count) || 0
            }
          : c
      ));
      toast.success("Campanha atualizada com sucesso!");
    } else {
      const newCampaign: Campaign = {
        id: `c${Date.now()}`,
        name: formData.name,
        description: formData.description,
        status: formData.status as "active" | "completed" | "paused" | "draft",
        budget: 0,
        spent: 0,
        clicks: 0,
        impressions: parseInt(formData.target_count) || 0,
        createdAt: new Date().toISOString().split('T')[0],
        startDate: formData.start_date,
        endDate: formData.end_date,
        userId: "1"
      };
      setCampaigns([...campaigns, newCampaign]);
      toast.success("Campanha criada com sucesso!");
    }

    setIsSheetOpen(false);
    resetForm();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-secondary text-secondary-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gerenciar Campanhas</h2>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={handleCreate} className="button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Nova Campanha
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {editingCampaign ? "EE2: Alterar Campanha" : "EE1: Incluir Campanha"}
              </SheetTitle>
              <SheetDescription>
                {editingCampaign ? "Altere os dados da campanha de phishing" : "Crie uma nova campanha de phishing simulado"}
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Campanha *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Campanha Segurança 2024"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o objetivo desta campanha..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template_id">Template *</Label>
                  <Select value={formData.template_id} onValueChange={(value) => setFormData({ ...formData, template_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Banco Seguro - Verificação de Conta</SelectItem>
                      <SelectItem value="2">IT Support - Reset de Senha</SelectItem>
                      <SelectItem value="3">LinkedIn - Convite de Conexão</SelectItem>
                      <SelectItem value="4">Suporte Técnico Urgente</SelectItem>
                      <SelectItem value="5">RH - Atualização de Benefícios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Data de Início *</Label>
                    <div className="relative">
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                      />
                      <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">Data de Término *</Label>
                    <div className="relative">
                      <Input
                        id="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        required
                      />
                      <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target_count">Número de Alvos *</Label>
                  <Input
                    id="target_count"
                    type="number"
                    placeholder="Ex: 150"
                    value={formData.target_count}
                    onChange={(e) => setFormData({ ...formData, target_count: e.target.value })}
                    min="1"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Quantidade de usuários que receberão o phishing simulado
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="paused">Pausada</SelectItem>
                      <SelectItem value="completed">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="flex-1">
                  {editingCampaign ? "Atualizar Campanha" : "Criar Campanha"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="card-hover glass-effect">
        <CardHeader>
          <CardTitle>Lista de Campanhas</CardTitle>
          <CardDescription>
            Gerencie todas as suas campanhas de marketing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Gasto</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status === 'active' ? 'Ativa' : 
                       campaign.status === 'completed' ? 'Concluída' : 
                       campaign.status === 'paused' ? 'Pausada' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                  <TableCell>{formatCurrency(campaign.spent)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{campaign.clicks.toLocaleString()} cliques</p>
                      <p className="text-muted-foreground">
                        {campaign.impressions.toLocaleString()} impressões
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(campaign)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(campaign.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>EE3: Excluir Campanha</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita.
              Todos os dados relacionados à campanha serão permanentemente removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir Campanha
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CampaignCrud;