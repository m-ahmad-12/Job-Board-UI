import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const url = `https://www.themuse.com/api/public/jobs?page=0${category ? `&category=${category}` : ''}${location ? `&location=${location}` : ''}`;
  const { data, loading, error } = useFetch(url);
  const [Bookmark, setBookMark] = useLocalStorage('bookmarks', []);

  function handleCategory(e) { setCategory(e.target.value); }
  function handleLocation(e) { setLocation(e.target.value); }

  let content;
  if (loading) {
    content = <p className={styles.message}>Loading jobs...</p>;
  } else if (error) {
    content = <p className={styles.message}>Failed to fetch jobs. Try again.</p>;
  } else if (data?.error) {
    content = <p className={styles.message}>{data.error}</p>;
  } else if (data?.results?.length === 0) {
    content = <p className={styles.message}>No jobs found for this filter. Try a different category.</p>;
  } else {
    content = (
      <div className={styles.grid}>
        {data?.results?.map((itm) => {
          const isAdded = Bookmark.some((fav) => fav.id === itm.id);
          return (
            <div key={itm.id} className={styles.card}>
              <Link to={`/job/${itm.id}`}>
                <p className={styles.jobTitle}>{itm.name}</p>
                <p className={styles.company}>{itm.company?.name}</p>
                <p className={styles.meta}>📍 {itm.locations.map((nm) => nm.name).join(', ')}</p>
                <span className={styles.badge}>{itm.categories.map((nm) => nm.name).join(', ')}</span>
              </Link>
              <button
                className={styles.bookmarkBtn}
                disabled={isAdded}
                onClick={() => setBookMark([...Bookmark, itm])}
              >
                {isAdded ? "✓ Bookmarked" : "Bookmark"}
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <select onChange={handleCategory}>
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Data Science">Data Science</option>
          <option value="Finance">Finance</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
          <option value="Management">Management</option>
          <option value="Operations">Operations</option>
          <option value="Project Management">Project Management</option>
          <option value="Writing">Writing</option>
        </select>

        <select onChange={handleLocation}>
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="New York">On-Site</option>
        </select>
      </div>

      <div>{content}</div>
    </div>
  );
};

export default Home;