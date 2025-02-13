# Sistema de Gestão de Solicitações de Equipamentos de TI

Este projeto é uma aplicação web que automatiza o fluxo de solicitação, montagem e entrega de equipamentos de TI. Ele possibilita que os colaboradores solicitem novos equipamentos, que os técnicos sejam automaticamente designados para montagem e que os administradores acompanhem e gerenciem todas as requisições.

> **Live Demo:** [https://sistema-de-gestao-de-solicitacoes-de-equipamentos-de-ti.vercel.app/](https://sistema-de-gestao-de-solicitacoes-de-equipamentos-de-ti.vercel.app/)

---

## Funcionalidades

- **Login e Registro:**  
  Autenticação com perfis distintos (Solicitante, Técnico, Comercial, Administrador).

- **Dashboard Personalizado:**  
  Painéis com informações relevantes para cada perfil:
  - **Solicitante:** Visualização de suas solicitações e histórico.
  - **Técnico:** Atribuições, atualizações de status e gerenciamento de tarefas.
  - **Administrador:** Visão completa das solicitações, gerenciamento de usuários, estoque e relatórios.

- **Solicitações de Equipamentos:**  
  - Criação, edição e cancelamento de solicitações.
  - Histórico de alterações com status (Pendente, Em Progresso, Concluída, Cancelada).

- **Gestão de Estoque:**  
  - Monitoramento dos componentes necessários para montagem dos equipamentos.
  - Verificação de estoque e solicitação de compras quando necessário.

- **Atribuição Automática de Técnicos:**  
  - Designação automática baseada na disponibilidade e especialização.
  - Atualização de status com geração de histórico.

- **Relatórios e Estatísticas:**  
  - Geração automática de relatórios sobre solicitações, desempenho dos técnicos e estoque de componentes.
  - Visualização de gráficos e estatísticas para apoiar a tomada de decisões.

- **Notificações:**  
  - Envio automático de notificações para os usuários em eventos importantes, como alteração de status e novas atribuições.
  - Possibilidade de envio em massa por tipo de usuário (ex.: todos os técnicos ou administradores).

---

## Tecnologias Utilizadas

- **Frontend:**
  - React com TypeScript
  - Vite para build
  - CSS Modules para estilização
  - Bibliotecas de gráficos: Chart.js e react-chartjs-2
  - jsPDF para geração de PDFs

- **Backend:**
  - Node.js com Express
  - Prisma ORM para acesso ao banco de dados PostgreSQL
  - API REST para gerenciamento de solicitações, usuários, notificações, etc.

- **Banco de Dados:**
  - PostgreSQL (utilizando NeonDB)

- **Deploy:**
  - Vercel para o frontend

---

## Instalação e Configuração

### Pré-requisitos

- Node.js (>=14)
- npm ou yarn
- Banco de dados PostgreSQL configurado conforme o arquivo `prisma/schema.prisma`

### Passos para Desenvolvimento

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/ivandro-neto/Sistema-de-Gestao-de-Solicitacoes-de-Equipamentos-de-TI.git
   cd Sistema-de-Gestao-de-Solicitacoes-de-Equipamentos-de-TI
