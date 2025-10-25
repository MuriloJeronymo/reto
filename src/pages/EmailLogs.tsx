import { useState } from "react";
import { Mail, Search, Filter, ExternalLink, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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

const EmailLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const emailLogs = [
    {
      id: "1",
      campaignId: "camp-001",
      campaignName: "Teste Phishing Q1 2024",
      messageId: "msg-abc123",
      fromEmail: "security@ocellaris.com",
      toEmail: "joao.silva@techcorp.com",
      subject: "Urgente: Confirme sua senha",
      sentAt: "2024-10-20 09:15:23",
      deliveredAt: "2024-10-20 09:15:25",
      openedAt: "2024-10-20 09:47:12",
      clickedAt: "2024-10-20 09:48:05",
      bounced: false,
      bounceReason: null,
      unsubscribed: false,
      spamReported: false,
      status: "Clicked"
    },
    {
      id: "2",
      campaignId: "camp-001",
      campaignName: "Teste Phishing Q1 2024",
      messageId: "msg-def456",
      fromEmail: "security@ocellaris.com",
      toEmail: "maria.santos@techcorp.com",
      subject: "Urgente: Confirme sua senha",
      sentAt: "2024-10-20 09:15:23",
      deliveredAt: "2024-10-20 09:15:26",
      openedAt: "2024-10-20 10:23:45",
      clickedAt: null,
      bounced: false,
      bounceReason: null,
      unsubscribed: false,
      spamReported: false,
      status: "Opened"
    },
    {
      id: "3",
      campaignId: "camp-002",
      campaignName: "Treinamento Engenharia Social",
      messageId: "msg-ghi789",
      fromEmail: "rh@ocellaris.com",
      toEmail: "carlos.mendes@finbank.com",
      subject: "Atualização de Benefícios",
      sentAt: "2024-10-20 10:30:00",
      deliveredAt: "2024-10-20 10:30:02",
      openedAt: null,
      clickedAt: null,
      bounced: false,
      bounceReason: null,
      unsubscribed: false,
      spamReported: false,
      status: "Delivered"
    },
    {
      id: "4",
      campaignId: "camp-002",
      campaignName: "Treinamento Engenharia Social",
      messageId: "msg-jkl012",
      fromEmail: "rh@ocellaris.com",
      toEmail: "usuario.invalido@finbank.com",
      subject: "Atualização de Benefícios",
      sentAt: "2024-10-20 10:30:00",
      deliveredAt: null,
      openedAt: null,
      clickedAt: null,
      bounced: true,
      bounceReason: "Mailbox not found",
      unsubscribed: false,
      spamReported: false,
      status: "Bounced"
    },
    {
      id: "5",
      campaignId: "camp-003",
      campaignName: "Simulação Spear Phishing",
      messageId: "msg-mno345",
      fromEmail: "ceo@ocellaris.com",
      toEmail: "ana.costa@healthcare.com",
      subject: "Re: Aprovação de Orçamento Urgente",
      sentAt: "2024-10-20 14:00:00",
      deliveredAt: "2024-10-20 14:00:03",
      openedAt: "2024-10-20 14:15:20",
      clickedAt: "2024-10-20 14:16:05",
      bounced: false,
      bounceReason: null,
      unsubscribed: false,
      spamReported: true,
      status: "Spam Reported"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Clicked": return <CheckCircle className="w-4 h-4 text-red-500" />;
      case "Opened": return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      case "Delivered": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Bounced": return <XCircle className="w-4 h-4 text-gray-500" />;
      case "Spam Reported": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Clicked": return "bg-red-500";
      case "Opened": return "bg-yellow-500";
      case "Delivered": return "bg-green-500";
      case "Bounced": return "bg-gray-500";
      case "Spam Reported": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logs de Email</h1>
          <p className="text-muted-foreground mt-1">
            Rastreamento completo de emails enviados
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="w-4 h-4" />
          Exportar Logs
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Enviados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Entregues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Abertos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Clicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Envios</CardTitle>
              <CardDescription>Tracking detalhado de cada email</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="clicked">Clicados</SelectItem>
                  <SelectItem value="opened">Abertos</SelectItem>
                  <SelectItem value="delivered">Entregues</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Campanha</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Enviado</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{log.toEmail}</div>
                        <div className="text-xs text-muted-foreground">De: {log.fromEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{log.campaignName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{log.subject}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{log.sentAt}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      {log.deliveredAt && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Entregue
                        </div>
                      )}
                      {log.openedAt && (
                        <div className="flex items-center gap-1 text-yellow-600">
                          <CheckCircle className="w-3 h-3" />
                          Aberto
                        </div>
                      )}
                      {log.clickedAt && (
                        <div className="flex items-center gap-1 text-red-600">
                          <CheckCircle className="w-3 h-3" />
                          Clicado
                        </div>
                      )}
                      {log.bounced && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <XCircle className="w-3 h-3" />
                          {log.bounceReason}
                        </div>
                      )}
                      {log.spamReported && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <AlertTriangle className="w-3 h-3" />
                          Spam
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status)}>
                      <span className="mr-1">{getStatusIcon(log.status)}</span>
                      {log.status}
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

export default EmailLogs;
