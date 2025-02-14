export interface User {
  id?: string;
  name: string;
  email: string;
  tipo: number;
  departamento : string
}


// Interface usada para exibir a listagem de solicitações (campos básicos)
export interface Request {
  id?: string;
  solicitanteId: string;
  equipamentoId: string;
  techId: string;
  descricao: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


// Interface para os detalhes de uma solicitação (campos adicionais)
export interface RequestDetailsType extends Request {
  description: string; // Descrição completa da solicitação
  // Adicione aqui outros campos que sejam retornados pela API, por exemplo:
  // solicitante: { id: number; name: string; email: string };
  // equipamentoId: number;
}
export interface AssignedRequest {
  id?: string; // id da atribuição, se necessário
  solicitacao: Request;
  tecnico: {
    id: string;
    usuario: {
      id: string;
      name: string;
      email: string;
    }
  };
}

export interface Report {
  id: string;
  tipoRelatorio: string;
  dataGeracao: string;
  conteudo: string;
}

export interface Equipamento{
  id: string;
  nome : string;
  descricao : string
  componentes : EquipamentoComponent[]
}

export interface Componente{
  id :string             
  nome :string
  descricao:string
  quantidadeDisponivel :number
  unidadeMedida:string
}

export interface EquipamentoComponent{
  id : string
  quantidadeNecessaria : number
  equipamento :Equipamento
  componente:Componente   
}