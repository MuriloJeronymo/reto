import { useState } from "react";
import { Plus, GraduationCap, Search, Video, FileText, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TrainingModules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const modules = [
    {
      id: "1",
      title: "Identificação de Phishing Básico",
      description: "Aprenda a reconhecer emails fraudulentos e proteger suas credenciais",
      category: "Phishing",
      difficultyLevel: "Beginner",
      durationMinutes: 30,
      contentType: "Video",
      passingScore: 70,
      certificateEnabled: true,
      mandatory: true,
      enrollmentCount: 450,
      completionCount: 380,
      avgScore: 85
    },
    {
      id: "2",
      title: "Técnicas Avançadas de Engenharia Social",
      description: "Entenda as táticas psicológicas usadas por atacantes",
      category: "Engenharia Social",
      difficultyLevel: "Advanced",
      durationMinutes: 60,
      contentType: "Interactive",
      passingScore: 80,
      certificateEnabled: true,
      mandatory: false,
      enrollmentCount: 220,
      completionCount: 180,
      avgScore: 78
    },
    {
      id: "3",
      title: "Simulação de Ataques Spear Phishing",
      description: "Exercícios práticos com cenários reais de ataques direcionados",
      category: "Phishing",
      difficultyLevel: "Intermediate",
      durationMinutes: 45,
      contentType: "Interactive",
      passingScore: 75,
      certificateEnabled: true,
      mandatory: true,
      enrollmentCount: 320,
      completionCount: 290,
      avgScore: 82
    },
    {
      id: "4",
      title: "Segurança de Senhas e Autenticação",
      description: "Melhores práticas para criação e gerenciamento de senhas",
      category: "Segurança Geral",
      difficultyLevel: "Beginner",
      durationMinutes: 25,
      contentType: "Video",
      passingScore: 70,
      certificateEnabled: false,
      mandatory: true,
      enrollmentCount: 500,
      completionCount: 475,
      avgScore: 88
    },
    {
      id: "5",
      title: "Proteção de Dados Sensíveis - LGPD",
      description: "Conformidade com a Lei Geral de Proteção de Dados",
      category: "Compliance",
      difficultyLevel: "Intermediate",
      durationMinutes: 90,
      contentType: "Text",
      passingScore: 85,
      certificateEnabled: true,
      mandatory: true,
      enrollmentCount: 410,
      completionCount: 350,
      avgScore: 79
    }
  ];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "Video": return Video;
      case "Interactive": return GraduationCap;
      case "Text": return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Módulos de Treinamento</h1>
          <p className="text-muted-foreground mt-1">
            Capacitação em segurança cibernética
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Módulo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Módulos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Inscritos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,900</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Biblioteca de Treinamentos</CardTitle>
              <CardDescription>Módulos disponíveis para capacitação</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar módulos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="phishing">Phishing</SelectItem>
                  <SelectItem value="social">Engenharia Social</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const ContentIcon = getContentIcon(module.contentType);
              const completionRate = (module.completionCount / module.enrollmentCount) * 100;

              return (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <ContentIcon className="w-8 h-8 text-primary" />
                      <div className="flex flex-col gap-1 items-end">
                        <Badge className={getDifficultyColor(module.difficultyLevel)}>
                          {module.difficultyLevel}
                        </Badge>
                        {module.mandatory && (
                          <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.durationMinutes} min
                      </div>
                      <Badge variant="secondary">{module.category}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{completionRate.toFixed(0)}%</span>
                      </div>
                      <Progress value={completionRate} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Inscritos</div>
                        <div className="font-semibold">{module.enrollmentCount}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Score Médio</div>
                        <div className="font-semibold">{module.avgScore}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {module.certificateEnabled && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Award className="w-4 h-4" />
                          Certificado
                        </div>
                      )}
                      <Button size="sm" className="ml-auto">
                        Ver Módulo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingModules;
