import { jsPDF } from "jspdf";
import "jspdf-autotable";
// @ts-ignore
const generatePDFTable = (
  title: string,
  headers: string[],
  data: any[][],
  filename: string
) => {
  const doc = new jsPDF();

  // Cabeçalho
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(52, 152, 219);
  doc.text(title, 14, 22);

  // Linha separadora
  doc.setDrawColor(52, 152, 219);
  doc.setLineWidth(0.5);
  doc.line(14, 26, 196, 26);

  // Data
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 34);

  // Tabela
  // @ts-ignore
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 40,
    theme: "grid",
    headStyles: { fillColor: [52, 152, 219], textColor: 255 },
    styles: { fontSize: 12 }
  });

  // Rodapé
  doc.setFontSize(10);
  doc.setTextColor(150);
  // @ts-ignore
  const finalY = doc.lastAutoTable.finalY || 280;
  doc.text("TechEquip Request - Comprovante Gerado Automaticamente", 14, finalY + 20);

  doc.save(filename);
};

export default generatePDFTable;
