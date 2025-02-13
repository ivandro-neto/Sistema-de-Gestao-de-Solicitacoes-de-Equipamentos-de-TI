import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import styles from "./css/style.module.css";
import { getEquipamentoById, getEquipamentos } from "../../../api/equipaments";
import { Equipamento } from "../../../utils/Model";

const InventoryVerification: React.FC = () => {
  const [equipmentId, setEquipmentId] = useState<string>("");
  const [equipment, setEquipment] = useState<Equipamento | null>(null);
  const [equipments, setEquipments] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEquipments, setLoadingEquipments] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const data = await getEquipamentos();
        setEquipments(data);
        if (data.length > 0) {
          setEquipmentId(data[0].id);
        }
      } catch (err) {
        setError("Erro ao buscar a lista de equipamentos.");
      } finally {
        setLoadingEquipments(false);
      }
    };
    fetchEquipments();
  }, []);

  const handleVerify = async () => {
    if (!equipmentId) return;
    setLoading(true);
    setError("");
    try {
      const data: Equipamento = await getEquipamentoById(equipmentId);
      setEquipment(data);
    } catch (err) {
      setError("Erro ao buscar informações do equipamento.");
      setEquipment(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Verificação de Estoque</h2>
        <div className={styles.equipmentsList}>
          <h3>Selecione o Equipamento</h3>
          {loadingEquipments ? (
            <p>Carregando equipamentos...</p>
          ) : (
            <select
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              className={styles.select}
            >
              {equipments.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.nome}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleVerify} className={styles.verifyButton}>
            Verificar
          </button>
        </div>
        {loading && <p className={styles.loading}>Carregando informações...</p>}
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
                    <td>{ec.componente?.nome}</td>
                    <td>{ec.quantidadeNecessaria}</td>
                    <td>{ec.componente?.quantidadeDisponivel}</td>
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
