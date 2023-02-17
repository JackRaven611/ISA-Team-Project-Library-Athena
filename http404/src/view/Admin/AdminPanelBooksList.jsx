import { useEffect, useState } from "react";
import { db } from "../../../src/Api/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Admin.module.css";
import { AdminPanelListItem } from "./AdminPanelListItem";

export const AdminPanelBooksList = () => {
  const [books, setBooks] = useState([]);

  const getData = () => {
    const itemsCollection = collection(db, "books");
    getDocs(itemsCollection).then((querySnapshot) => {
      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(books);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.adminPanelTitleWrapper}>
        <h2 className={styles.adminPanelTitle}>
          Zarządzaj książkami w bibliotece:
        </h2>
      </div>
      {books.map((book) => (
        <AdminPanelListItem book={book} getData={getData} />
      ))}
    </>
  );
};
