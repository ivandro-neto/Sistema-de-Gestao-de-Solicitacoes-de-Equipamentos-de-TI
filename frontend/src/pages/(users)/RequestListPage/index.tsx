//@ts-ignore
import React, { useState, useEffect } from "react";

import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { 
  getSolicitacaoByUserId, 
  createSolicitacao, 
  updateSolicitacao, 
  deleteSolicitacao 
} from "../../../api/requests";
import type { Request } from "../../../utils/Model"; // Interface Request: { id, descricao, status, date, equipamentoId }
import CreateModal from "../../../components/Modals/CreateModal";

const RequestsListUser: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Estados para modais
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null);

  // Função para atualizar a lista de solicitações
  const fetchRequests = async () => {
    try {
      const sessionData = localStorage.getItem("session");
      const session = sessionData ? JSON.parse(sessionData) : null;
      if (!session || !session.id) {
        setError("Sessão inválida. Faça login novamente.");
        setLoading(false);
        return;
      }
      const data: Request[] = await getSolicitacaoByUserId(session.id);
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar solicitações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Abertura dos modais
  const openCreateModal = () => setShowCreateModal(true);
  const openUpdateModal = (req: Request) => {
    setCurrentRequest(req);
    setShowUpdateModal(true);
  };
  const openDeleteModal = (req: Request) => {
    setCurrentRequest(req);
    setShowDeleteModal(true);
  };

  // Fechamento dos modais
  const closeCreateModal = () => setShowCreateModal(false);
  const closeUpdateModal = () => {
    setCurrentRequest(null);
    setShowUpdateModal(false);
  };
  const closeDeleteModal = () => {
    setCurrentRequest(null);
    setShowDeleteModal(false);
  };

  // Funções de ação (criar, atualizar, excluir)
  const handleCreate = async (data: { descricao: string; equipamentoId: string }) => {
    try {
      const sessionData = localStorage.getItem("session");
      const session = sessionData ? JSON.parse(sessionData) : null;
      if (!session || !session.id) {
        setError("Sessão inválida. Faça login novamente.");
        return;
      }
      // Inclui o solicitanteId vindo da sessão
      await createSolicitacao({ solicitanteId: session.id, descricao: data.descricao, equipamentoId: data.equipamentoId });
      closeCreateModal();
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError("Erro ao criar solicitação.");
    }
  };

  const handleUpdate = async (data: { id: string; descricao?: string; status?: string; equipamentoId?: string }) => {
    try {
      await updateSolicitacao(data.id, data);
      closeUpdateModal();
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar solicitação.");
    }
  };

  const handleDelete = async () => {
    if (!currentRequest) return;
    try {
      await deleteSolicitacao(String(currentRequest.id));
      closeDeleteModal();
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError("Erro ao excluir solicitação.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando solicitações...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.error}>{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Minhas Solicitações</h2>
        <button type="button" onClick={openCreateModal} className={styles.createButton}>Criar Solicitação</button>
        {requests.length === 0 ? (
          <p className={styles.noData}>Nenhuma solicitação encontrada.</p>
        ) : (
          <table className={`${styles.table} table`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.descricao}</td>
                  <td>{req.status}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td>
                    <a href={`/request/${req.id}`} className={styles.detailLink}>Ver Detalhes</a>
                    <button type ="button" onClick={() => openUpdateModal(req)} className={styles.updateButton}>Atualizar</button>
                    <button type="button" onClick={() => openDeleteModal(req)} className={styles.deleteButton}>Cancelar </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showCreateModal && (
          <CreateModal onClose={closeCreateModal} onCreate={handleCreate} />
        )}

        {showUpdateModal && currentRequest && (
          <UpdateModal request={currentRequest} onClose={closeUpdateModal} onUpdate={handleUpdate} />
        )}

        {showDeleteModal && currentRequest && (
          <DeleteModal request={currentRequest} onClose={closeDeleteModal} onDelete={handleDelete} />
        )}
      </div>
    </Layout>
  );
};



interface UpdateModalProps {
  request: Request;
  onClose: () => void;
  onUpdate: (data: { id: string; descricao?: string; status?: string; equipamentoId?: string }) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ request, onClose, onUpdate }) => {
  const [descricao, setDescricao] = useState(request.descricao);
  const [status, setStatus] = useState(request.status);
  const [equipamentoId, setEquipamentoId] = useState(request.equipamentoId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ id:String( request.id), descricao, status, equipamentoId });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={"modal"}>
        <h3>Atualizar Solicitação</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <select title="status" value={status} onChange={(e) => setStatus(e.target.value)} disabled>
            <option value="pending">Pendente</option>
            <option value="progress">Em Progresso</option>
            <option value="completed">Concluída</option>
          </select>
          <input
            type="text"
            placeholder="ID do Equipamento"
            value={equipamentoId}
            onChange={(e) => setEquipamentoId(e.target.value)}
            disabled
          />
          <div className={styles.modalActions}>
            <button type="submit">Atualizar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteModalProps {
  request: Request;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ request, onClose, onDelete }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={"modal"}>
        <h3>Excluir Solicitação</h3>
        <p>
          Tem certeza que deseja excluir a solicitação com descrição <strong>{request.descricao}</strong>?
        </p>
        <div className={styles.modalActions}>
          <button type="button" onClick={onDelete}>Confirmar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default RequestsListUser;
