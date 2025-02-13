// src/components/compras/PurchaseRequest.tsx
import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { getComponentes } from "../../../api/components";
import { createPurchaseRequest } from "../../../api/purchase";
import { Componente } from "../../../utils/Model";

const PurchaseRequest: React.FC = () => {
  const [componentes, setComponentes] = useState<Componente[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const data = await getComponentes();
        setComponentes(data);
        if (data.length > 0) {
          setSelectedComponent(data[0].id);
        }
      } catch (err) {
        setError("Erro ao buscar componentes.");
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPurchaseRequest({ componenteId: selectedComponent, quantidade: quantity });
      setMessage("Solicitação de compra criada com sucesso.");
    } catch (err) {
      setError("Erro ao criar solicitação de compra.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Carregando componentes...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Solicitação de Compras</h2>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="component">Componente:</label>
          <select
            id="component"
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            required
          >
            {componentes.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.nome}
              </option>
            ))}
          </select>
          <label htmlFor="quantity">Quantidade:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <button type="submit">Enviar Solicitação</button>
        </form>
      </div>
    </Layout>
  );
};

export default PurchaseRequest;
