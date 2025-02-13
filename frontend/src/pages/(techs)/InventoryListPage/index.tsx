// src/components/estoque/InventoryList.tsx
import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { getComponentes } from "../../../api/components";
import { Componente } from "../../../utils/Model";

const InventoryList: React.FC = () => {
  const [components, setComponents] = useState<Componente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default InventoryList;
