import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import styles from "./JobDetail.module.css";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`https://www.themuse.com/api/public/jobs/${id}`);

  if (loading) return <p className={styles.message}>Loading job details...</p>;
  if (error) return <p className={styles.message}>Failed to load job. Try again.</p>;
  if (data?.error) return <p className={styles.message}>{data.error}</p>;
  if (!data) return null;

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

      <div className={styles.header}>
        <h1 className={styles.jobTitle}>{data?.name}</h1>
        <p className={styles.company}>{data?.company?.name}</p>

        <div className={styles.metaRow}>
          <span className={styles.meta}>📍 {data?.locations?.map((loc) => loc.name).join(", ")}</span>
          <span className={styles.badge}>{data?.categories?.map((cat) => cat.name).join(", ")}</span>
          <span className={styles.meta}>📅 {new Date(data?.publication_date).toLocaleDateString()}</span>
        </div>

        <a href={data?.refs?.landing_page} target="_blank" rel="noreferrer" className={styles.applyBtn}>
          Apply Now →
        </a>
      </div>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: data?.contents }}
      />
    </div>
  );
};

export default JobDetail;