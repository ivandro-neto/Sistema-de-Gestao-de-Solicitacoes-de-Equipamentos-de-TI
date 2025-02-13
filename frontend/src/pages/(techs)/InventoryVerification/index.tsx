// src/components/estoque/InventoryVerification.tsx
import React, { useState } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { getEquipamentoById } from "../../../api/equipaments";
import { Equipamento } from "../../../utils/Model";

const InventoryVerification: React.FC = () => {
  const [equipmentId, setEquipmentId] = useState<string>("");
  const [equipment, setEquipment] = useState<Equipamento | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleVerify = async () => {
    if (!equipmentId) return;
    setLoading(true);
    setError("");
    try {
      const data: Equipamento = await getEquipamentoById(equipmentId);
      setEquipment(data);
    } catch (err) {
      setError("Erro ao buscar informações do equipamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Verificação de Estoque</h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            placeholder="Digite o ID do equipamento"
          />
          <button onClick={handleVerify}>Verificar</button>
        </div>
        {loading && <p>Carregando informações...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {equipment && (
          <div className={styles.equipmentDetails}>
            <h3>{equipment.nome}</h3>
            <p>{equipment.descricao}</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Componente</th>
                  <th>Qtd. Necessária</th>
                  <th>Qtd. Disponível</th>
                </tr>
              </thead>
              <tbody>
                {equipment.componentes.map((ec) => (
                  <tr key={ec.id}>
                    <td>{ec.componente.nome}</td>
                    <td>{ec.quantidadeNecessaria}</td>
                    <td>{ec.componente.quantidadeDisponivel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InventoryVerification;
