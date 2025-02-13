import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { getComponentes, updateComponente } from "../../../api/components";
import { Componente } from "../../../utils/Model";

const InventoryListAdmin: React.FC = () => {
  const [components, setComponents] = useState<Componente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<Componente | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const data = await getComponentes();
        setComponents(data);
      } catch (err) {
        setError("Erro ao buscar o estoque.");
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, []);

  const openUpdateModal = (comp: Componente) => {
    setCurrentComponent(comp);
    setNewQuantity(comp.quantidadeDisponivel);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setCurrentComponent(null);
  };

  const handleUpdateQuantity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentComponent) return;
    try {
      const updated = await updateComponente(currentComponent.id, {
        nome: currentComponent.nome,
        descricao: currentComponent.descricao,
        quantidadeDisponivel: newQuantity,
        unidadeMedida: currentComponent.unidadeMedida,
      });
      setComponents((prev) =>
        prev.map((comp) => (comp.id === updated.id ? updated : comp))
      );
      closeUpdateModal();
    } catch (err) {
      setError("Erro ao atualizar quantidade.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando estoque...</div>
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
        <h2 className={styles.title}>Listagem de Estoque</h2>
        {components.length === 0 ? (
          <p className={styles.noData}>Nenhum componente encontrado.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Qtd. Disponível</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {components.map((comp) => (
                <tr key={comp.id}>
                  <td>{comp.id}</td>
                  <td>{comp.nome}</td>
                  <td>{comp.descricao}</td>
                  <td>{comp.quantidadeDisponivel}</td>
                  <td>{comp.unidadeMedida}</td>
                  <td>
                    <button onClick={() => openUpdateModal(comp)}>
                      Atualizar Quantidade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showUpdateModal && currentComponent && (
        <div className={styles.modalOverlay}>
          <div className={"modal"}>
            <h3>Atualizar Quantidade</h3>
            <form onSubmit={handleUpdateQuantity}>
              <p>
                Componente: <strong>{currentComponent.nome}</strong>
              </p>
              <label htmlFor="quantity">Nova Quantidade:</label>
              <input
                id="quantity"
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
                required
              />
              <div className={styles.modalActions}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={closeUpdateModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default InventoryListAdmin;
