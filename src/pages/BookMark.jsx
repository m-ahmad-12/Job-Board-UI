import useLocalStorage from "../Hooks/useLocalStorage";
import { Link } from "react-router-dom";
import styles from "./Bookmarks.module.css";

const BookMark = () => {
  const [Bookmark, setBookMark] = useLocalStorage('bookmarks', []);

  if (Bookmark.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>My Bookmarks</h2>
        <p className={styles.empty}>No bookmarks yet — go find some jobs!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Bookmarks</h2>
      <div className={styles.grid}>
        {Bookmark.map((mark) => (
          <div key={mark.id} className={styles.card}>
            <Link to={`/job/${mark.id}`}>
              <p className={styles.jobTitle}>{mark?.name}</p>
              <p className={styles.company}>{mark?.company?.name}</p>
              <p className={styles.meta}>📍 {mark?.locations?.map((loc) => loc.name).join(", ")}</p>
              <span className={styles.badge}>{mark?.categories?.map((cat) => cat.name).join(", ")}</span>
            </Link>
            <button
              className={styles.removeBtn}
              onClick={() => setBookMark(Bookmark.filter((itm) => itm.id !== mark.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMark;