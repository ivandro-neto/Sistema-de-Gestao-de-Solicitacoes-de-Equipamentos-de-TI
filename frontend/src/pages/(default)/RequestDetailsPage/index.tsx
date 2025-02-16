//@ts-ignore
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./css/style.module.css";
import Layout from "../../Layout";
import { getSolicitacaoById } from "../../../api/requests";
import { getHistoricos } from "../../../api/histories";
import type { RequestDetailsType } from "../../../utils/Model";
import { Loading } from "../../../components/LoadingScreen";

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<RequestDetailsType | null>(null);
  const [historicos, setHistoricos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDetailsAndHistory = async () => {
      try {
      //@ts-ignore
        const reqData = await getSolicitacaoById(id!);
        const req = reqData
        req.usuario = reqData.usuario?.nome
        req.techId= reqData.atribuicoes?.tecnicoId? reqData.atribuicoes?.tecnicoId : "" 
        
       
        setRequest(req);
        
        const allHist = await getHistoricos();
        // Converte ambos os valores para string para garantir a comparação
        const filteredHist = allHist.filter(
          (hist: any) => hist.solicitacaoId === id
        );
        setHistoricos(filteredHist);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar detalhes da solicitação.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsAndHistory();
  }, [id]);



  if (loading) {
    return (
      <Layout>
        <Loading/>
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

  if (!request) {
    return (
      <Layout>
        <div className={styles.error}>Solicitação não encontrada.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Detalhes da Solicitação</h2>
        <div className={styles.details}>
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>Solicitante:</strong> {request.usuario}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p>
            <strong>Data:</strong> {new Date(request.createdAt).toLocaleDateString()}
          </p>
          <p><strong>Descrição:</strong> {request.descricao}</p>
          <p><strong>Tecnico ID:</strong> {request.techId ? request.techId : "Aguardando atendimento..."}</p>
        </div>
     
        <div className={styles.history}>
          <h3>Histórico de Solicitações</h3>
          {historicos.length === 0 ? (
            <p className={styles.noData}>Nenhum histórico encontrado para esta solicitação.</p>
          ) : (
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Status Anterior</th>
                  <th>Status Novo</th>
                  <th>Data de Alteração</th>
                </tr>
              </thead>
              <tbody>
                {historicos.map((hist) => (
                  <tr key={hist.id}>
                    <td>{hist.statusAnterior}</td>
                    <td>{hist.statusNovo}</td>
                    <td>{new Date(hist.dataAlteracao).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RequestDetails;
