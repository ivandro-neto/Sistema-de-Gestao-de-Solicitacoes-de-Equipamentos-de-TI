import React, { useState, useEffect } from "react";
import styles from "./css/style.module.css";
import { getEquipamentos } from "../../../api/equipaments";

interface Equipment {
  id: number;
  nome: string;
  // Outros campos se necessário
}

interface CreateModalProps {
  onClose: () => void;
  onCreate: (data: { descricao: string; equipamentoId: number }) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onCreate }) => {
  const [descricao, setDescricao] = useState("");
  const [equipamentoId, setEquipamentoId] = useState<number>(0);
  const [equipamentos, setEquipamentos] = useState<Equipment[]>([]);
  const [loadingEquip, setLoadingEquip] = useState<boolean>(true);
  const [errorEquip, setErrorEquip] = useState<string>("");

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        const data: Equipment[] = await getEquipamentos();
        setEquipamentos(data);
        // Define o primeiro equipamento como padrão, se existir
        if (data.length > 0) {
          setEquipamentoId(data[0].id);
        }
      } catch (err) {
        console.error("Erro ao buscar equipamentos:", err);
        setErrorEquip("Erro ao buscar equipamentos.");
      } finally {
        setLoadingEquip(false);
      }
    };
    fetchEquipamentos();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ descricao, equipamentoId });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={"modal"}>
        <h3>Criar Solicitação</h3>
        {loadingEquip ? (
          <p>Carregando equipamentos...</p>
        ) : errorEquip ? (
          <p className={styles.error}>{errorEquip}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Descrição da solicitação"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <select
              value={equipamentoId}
              onChange={(e) => setEquipamentoId(Number(e.target.value))}
              required
            >
              {equipamentos.map((equip) => (
                <option key={equip.id} value={equip.id}>
                  {equip.nome}
                </option>
              ))}
            </select>
            <div className={styles.modalActions}>
              <button type="submit">Criar</button>
              <button type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
