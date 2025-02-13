import { useNavigate } from "react-router-dom";
import styles from "./css/styles.module.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      {/* Seção de Herói */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>TechEquip Request</h1>
          <p className={styles.heroSubtitle}>
            Simplifique a montagem de equipamentos de TI na sua empresa
          </p>
          <p className={styles.heroDescription}>
            Desde a solicitação até a verificação de estoque e atribuição de técnicos,
            oferecemos uma solução completa para gerenciar cada requisição de forma
            eficiente e transparente.
          </p>
          <div className={styles.heroButtons}>
            <button type="button"className={styles.ctaButton} onClick={() => navigate("/login")}>
              Login
            </button>
            <button type="button"className={styles.outlineButton} onClick={() => navigate("/register")}>
              Registrar
            </button>
          </div>
        </div>

        {/* Imagem de Herói (exemplo de imagem da internet via Unsplash) */}
        <div className={styles.heroImageWrapper}>
          <img
            src="/hero.png"
            alt="Equipamentos de TI"
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* Seção Sobre */}
      <section className={styles.aboutSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Sobre o TechEquip Request</h2>
          <p className={styles.sectionText}>
            O TechEquip Request foi criado para simplificar e automatizar o fluxo
            de montagem de equipamentos de TI. Nossa plataforma permite que
            colaboradores solicitem novos dispositivos, técnicos verifiquem o estoque
            e gerentes acompanhem cada etapa do processo.
          </p>
          <p className={styles.sectionText}>
            Com uma interface intuitiva, você tem total controle sobre as requisições,
            status de montagem, alocação de componentes e muito mais.
          </p>
        </div>
      </section>

      {/* Seção de Recursos (Features) */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Recursos Principais</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2917/2917999.png"
                alt="Estoque"
                className={styles.featureIcon}
              />
              <h3 className={styles.featureTitle}>Verificação de Estoque</h3>
              <p className={styles.featureText}>
                Monitore componentes disponíveis para cada montagem, evitando atrasos e
                solicitando compras quando necessário.
              </p>
            </div>
            <div className={styles.featureCard}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2917/2917983.png"
                alt="Atribuição"
                className={styles.featureIcon}
              />
              <h3 className={styles.featureTitle}>Atribuição de Técnicos</h3>
              <p className={styles.featureText}>
                Garanta que cada requisição seja designada a um técnico especializado
                e acompanhe o progresso em tempo real.
              </p>
            </div>
            <div className={styles.featureCard}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
                alt="Relatórios"
                className={styles.featureIcon}
              />
              <h3 className={styles.featureTitle}>Relatórios e Estatísticas</h3>
              <p className={styles.featureText}>
                Gere relatórios sobre solicitações, desempenho dos técnicos, histórico
                e muito mais para tomar decisões embasadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>O que dizem nossos clientes</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
          
              <p className={styles.testimonialText}>
                "O TechEquip Request revolucionou a forma como gerenciamos
                solicitações de TI. Muito prático!"
              </p>
              <p className={styles.testimonialAuthor}>- Maria Souza, Empresa X</p>
            </div>
            <div className={styles.testimonialCard}>
            
              <p className={styles.testimonialText}>
                "Economizamos tempo e dinheiro graças à verificação automática de
                estoque e atribuição de técnicos."
              </p>
              <p className={styles.testimonialAuthor}>- João Silva, Corp Y</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Formulário (Exemplo de Contato ou Consulta) */}
      <section className={styles.contactSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Solicite uma Demonstração</h2>
          <p className={styles.sectionText}>
            Quer conhecer mais sobre o TechEquip Request? Preencha o formulário abaixo e
            nossa equipe entrará em contato para uma demonstração completa.
          </p>
          <form className={styles.contactForm}>
            <input
              type="text"
              placeholder="Seu Nome"
              className={styles.formInput}
              required
            />
            <input
              type="email"
              placeholder="Seu Email"
              className={styles.formInput}
              required
            />
            <textarea
              placeholder="Mensagem"
              className={styles.formTextarea}
              required
            />
            <button type="submit" className={styles.ctaButton}>
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 TechEquip Request - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
