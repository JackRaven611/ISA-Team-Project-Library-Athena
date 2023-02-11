import { useEffect, useState } from "react";
import { db } from "../../../src/Api/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "./Admin.module.css";
import { Modal } from "@mui/material";
import SearchingSite from "../SearchingSite/SearchingSite";

export const Edit = () => {
  // const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [books, setEditBooks] = useState([]);
  const [title, setNewTitle] = useState();
  const [author, setNewAuthor] = useState();
  const [description, setNewDescription] = useState();
  const [status, setNewStatus] = useState();
  const [image, setNewImage] = useState();
  const [genre, setNewGenre] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  
  const handleDelete = (id) => {
    const docRef = doc(db, "books", id);

    deleteDoc(docRef)
      .then(() => {
        toast.success("Ksiązka usunięta!");
        setEditBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
    id.preventDefault();
  };

  const getData = () => {
    const itemsCollection = collection(db, "books");
    getDocs(itemsCollection).then((querySnapshot) => {
      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEditBooks(books);
    });
  };

  useEffect(() => {
    getData();
  }, []);


  const handleUpdate = (id) => {
    const docRef = doc(db, "books", id);
    
    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const updates = {
          title: title || doc.data().title,
          author: author || doc.data().author,
          description: description || doc.data().description,
          status: status || doc.data().status,
          image: image || doc.data().image,
          genres: genre || doc.data().genre,
        };
        updateDoc(docRef, updates, id)
          .then(() => {
            toast.success("Title has been updated successfully.");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <>
    <h2 className={styles.h2}>Zarządzaj książkami w bibliotece:</h2>
        {books.map((item) => (
          <>
          {console.log(item)}
            <li className={styles.listBooksWrapper}>
            <img src={item.image} alt="okładka ksiązki" style={{width:"10vw"}}></img>
            <p className={styles.bookTitle} >{item.title}</p>
            <p className={styles.bookAuthor} >{item.author}</p>
            <p className={styles.bookStatus} >{item.status} </p>
            <button className={styles.btnDelete} id={styles.buttonAppearance} onClick={() => { handleDelete(item.id)}}>Usuń</button>
            <button className={styles.btnEdit} id={styles.buttonAppearance}  onClick={() => {handleOpen(item.id)}}>Edytuj</button>
            </li>
            <Modal
              open={open}
              onClose={handleClose}
              contentLabel="Example Modal"
            >
              <div className={styles.modalWrapper}>
              <label htmlFor="Tytuł">Tytuł:</label>
              <input
                className={styles.input}
                type="text"
                name="title"
                value={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <label htmlFor="author">Autor:</label>
              <input
                className={styles.input}
                key={item.author}
                type="text"
                name="author"
                value={author}
                onChange={(e) => setNewAuthor(e.target.value)}
              />

              <label htmlFor="description">Opis:</label>
              <input
                className={styles.input}
                key={item.description}
                type="text"
                name="description"
                value={description}
                onChange={(e) => setNewDescription(e.target.value)}
              />

              <label htmlFor="status">Niedostępna</label>
              <input
                className={styles.input}
                key={item.status}
                type="radio"
                name="status"
                value="niedostępna"
                checked={status === "niedostępna"}
                onChange={(e) => setNewStatus(e.target.value)}
              />

              <label htmlFor="status">Dostępna</label>
              <input
                className={styles.input}
                type="radio"
                name="status"
                key={item.statuss}
                value="dostępna"
                checked={status === "dostępna"}
                onChange={(e) => setNewStatus(e.target.value)}
              />

              <label htmlFor="imageurl">Zdjęcie ksiązki:</label>
              <input
                className={styles.input}
                key={item.imageURL}
                type="text"
                placeholder={item.imageURL}
                name="imageURL"
                value={image}
                onChange={(e) => setNewImage(e.target.value)}
              />
                <label htmlFor="gatunek">Gatunek:</label>
              <select
                className={styles.input}
                id="genres"
                name="genres"
                key={item.genres}
                onChange={(e) => setNewGenre(e.target.value)}
              >
                <option value={genre}></option>
                <option value="kryminał">Kryminał</option>
                <option value="lektura szkolna">Lektura szkolna</option>
                <option value="poradnik">Poradnik</option>
                <option value="ksiąka dla dzieci">Ksiąka dla dzieci</option>
                <option value="biografia">Biografia</option>
                <option value="literatura obyczajowa">
                  Literatura obyczajowa
                </option>
                <option value="thiller">Thiller</option>
                <option value="literatura piękna">Literatura piękna</option>
              </select>
              { console.log(item.id)}
              <button id={styles.buttonAppearance}  onClick={() => { handleUpdate(item.id)}}>Wyślij zmiany</button>

              <button id={styles.buttonAppearance}  onClick={handleClose}>Zamknij</button>
              </div>
            </Modal>
            {/* <SearchingSite/> */}
            </>
        ))}
    </>
  );
};
