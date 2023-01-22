import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Api/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BookDetails.module.css";

export const BookDetails = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const notify = () => toast.success("Added to Your Library");

    function getBooksById(id) {
        const docRef = doc(db, "books", id);
        return getDoc(docRef)
            .then((querySnapshot) => {
                return {
                    id: querySnapshot.id,
                    ...querySnapshot.data(),
                };
            })
            .then((data) => {
                return data;
            });
    }

    useEffect(() => {
        getBooksById(params.bookId)
            .then((data) => {
                setBook(data);
            })
            .catch((er) => console.log(er));
    }, [params.bookId]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{book.title}</h1>
            <section className={styles.book_info}>
                <img src={book.image} alt="cover img" />{" "}
                <ul className={styles.info_list}>
                    <li>
                        <p>Title: {book.title}</p>
                    </li>
                    <li>
                        <p>Author: {book.author}</p>
                    </li>
                    <li>
                        <p>Status: {book.status}</p>
                    </li>
                </ul>
            </section>
            <section className={styles.book_description}>
                <h3>Description:</h3>
                <p>{book.description}</p>
            </section>
            <div className={styles.button_wrapper}>
                <button
                    onClick={book.status === "avaliable" ? notify : null}
                    className={styles.button}
                >
                    {book.status === "avaliable"
                        ? "Rent this book"
                        : "Check availability"}
                </button>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
            </div>
        </div>
    );
};
