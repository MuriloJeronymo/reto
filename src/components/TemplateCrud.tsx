import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Copy, Mail, Globe, Smartphone, FileText } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Template {
  id: string;
  name: string;
  type: "Email" | "Landing Page" | "SMS";
  category: string;
  content_html: string;
  content_text: string;
  variables: string;
  status: "active" | "inactive" | "draft";
  description: string;
  difficulty: string;
  usage: number;
  successRate: number;
  language: string;
  lastUpdated: string;
}

const TemplateCrud = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Banco Seguro - Verificação de Conta",
      category: "Financeiro",
      type: "Email",
      difficulty: "Médio",
      description: "E-mail simulando verificação de conta bancária com link malicioso",
      usage: 156,
      successRate: 23.4,
      language: "PT-BR",
      lastUpdated: "2024-01-15",
      content_html: "<html><body><h1>Verificação de Conta</h1></body></html>",
      content_text: "Verificação de Conta necessária",
      variables: "{{nome_usuario}}, {{banco}}",
      status: "active"
    },
    {
      id: "2",
      name: "IT Support - Reset de Senha",
      category: "Técnico",
      type: "Email",
      difficulty: "Fácil",
      description: "Solicitação falsa de reset de senha do departamento de TI",
      usage: 89,
      successRate: 18.7,
      language: "PT-BR",
      lastUpdated: "2024-01-12",
      content_html: "<html><body><h1>Reset de Senha</h1></body></html>",
      content_text: "Reset de senha necessário",
      variables: "{{nome_usuario}}, {{empresa}}",
      status: "active"
    }
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Email" as "Email" | "Landing Page" | "SMS",
    category: "",
    content_html: "",
    content_text: "",
    variables: "",
    status: "draft" as "active" | "inactive" | "draft"
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Email",
      category: "",
      content_html: "",
      content_text: "",
      variables: "",
      status: "draft"
    });
    setEditingTemplate(null);
  };

  const handleCreate = () => {
    setIsSheetOpen(true);
    resetForm();
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      category: template.category,
      content_html: template.content_html,
      content_text: template.content_text,
      variables: template.variables,
      status: template.status
    });
    setIsSheetOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingTemplateId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingTemplateId) {
      setTemplates(templates.filter(t => t.id !== deletingTemplateId));
      toast.success("Template excluído com sucesso!");
      setIsDeleteDialogOpen(false);
      setDeletingTemplateId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTemplate) {
      setTemplates(templates.map(t =>
        t.id === editingTemplate.id
          ? {
              ...t,
              name: formData.name,
              type: formData.type,
              category: formData.category,
              content_html: formData.content_html,
              content_text: formData.content_text,
              variables: formData.variables,
              status: formData.status,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : t
      ));
      toast.success("Template atualizado com sucesso!");
    } else {
      const newTemplate: Template = {
        id: `t${Date.now()}`,
        name: formData.name,
        type: formData.type,
        category: formData.category,
        content_html: formData.content_html,
        content_text: formData.content_text,
        variables: formData.variables,
        status: formData.status,
        description: "Novo template criado",
        difficulty: "Médio",
        usage: 0,
        successRate: 0,
        language: "PT-BR",
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
      toast.success("Template criado com sucesso!");
    }

    setIsSheetOpen(false);
    resetForm();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-success/20 text-success";
      case "Médio":
        return "bg-warning/20 text-warning";
      case "Difícil":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Email":
        return Mail;
      case "Landing Page":
        return Globe;
      case "SMS":
        return Smartphone;
      default:
        return FileText;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success">Ativo</Badge>;
      case "inactive":
        return <Badge className="bg-muted/20 text-muted-foreground">Inativo</Badge>;
      default:
        return <Badge className="bg-warning/20 text-warning">Rascunho</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">Biblioteca de templates para campanhas de phishing</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Template
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[700px] sm:max-w-[700px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {editingTemplate ? "EE5: Alterar Template" : "EE4: Incluir Template"}
              </SheetTitle>
              <SheetDescription>
                {editingTemplate ? "Altere os dados do template de phishing" : "Crie um novo template de phishing simulado"}
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Template *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Template Banco - Atualização de Dados"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Landing Page">Landing Page</SelectItem>
                        <SelectItem value="SMS">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Redes Sociais">Redes Sociais</SelectItem>
                        <SelectItem value="Suporte">Suporte</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                        <SelectItem value="Mensagem">Mensagem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_html">Conteúdo HTML *</Label>
                  <Textarea
                    id="content_html"
                    placeholder="<html><body>...</body></html>"
                    value={formData.content_html}
                    onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
                    rows={6}
                    className="font-mono text-sm"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Código HTML do template para emails ou landing pages
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_text">Conteúdo Texto *</Label>
                  <Textarea
                    id="content_text"
                    placeholder="Versão em texto simples do conteúdo..."
                    value={formData.content_text}
                    onChange={(e) => setFormData({ ...formData, content_text: e.target.value })}
                    rows={4}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Versão em texto simples para emails ou SMS
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variables">Variáveis</Label>
                  <Input
                    id="variables"
                    placeholder="Ex: {{nome}}, {{email}}, {{empresa}}"
                    value={formData.variables}
                    onChange={(e) => setFormData({ ...formData, variables: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Variáveis que serão substituídas no template (separadas por vírgula)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="flex-1">
                  {editingTemplate ? "Atualizar Template" : "Criar Template"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const TypeIcon = getTypeIcon(template.type);
          return (
            <Card key={template.id} className="transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TypeIcon className="w-4 h-4 text-primary" />
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                    {getStatusBadge(template.status)}
                  </div>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{template.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoria:</span>
                    <span>{template.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uso:</span>
                    <span>{template.usage} campanhas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de Sucesso:</span>
                    <span className="font-medium text-warning">{template.successRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Atualizado:</span>
                    <span>{new Date(template.lastUpdated).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Eye className="w-3 h-3" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => handleEdit(template)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-2" onClick={() => handleDeleteClick(template.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{templates.length}</p>
              <p className="text-sm text-muted-foreground">Total de Templates</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{templates.reduce((acc, t) => acc + t.usage, 0)}</p>
              <p className="text-sm text-muted-foreground">Uso Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {templates.length > 0 ? (templates.reduce((acc, t) => acc + t.successRate, 0) / templates.length).toFixed(1) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Taxa Média</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{templates.filter(t => t.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Templates Ativos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>EE6: Excluir Template</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.
              O template será removido permanentemente e não poderá mais ser usado em campanhas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir Template
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TemplateCrud;
