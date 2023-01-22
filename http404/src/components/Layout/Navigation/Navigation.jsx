import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "./atena_logo1.png";
import avatar from "./atena_avatar1.png";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <img className={styles.logoAtena} src={logo} alt="logo Atena"></img>
      <div className={styles.navigationDetails}>
        <div className={styles.btnWrapper}>
              <NavLink to="auth/signin">
                <button>Zaloguj się</button>
              </NavLink>
              <NavLink to="auth/signup">
                <button>Zarejestruj się</button>
              </NavLink>
          
              {/* <NavLink to="admin">
                <button className={styles.btn}>Panel klienta</button>
              </NavLink> */}

          {/* <button className={styles.btn}>
            Wyloguj się
          </button> */}
        </div>
      
      <div className={styles.avatarWrapper}>
        <img
          className={styles.avatarAtena}
          src={avatar}
          alt="avatar Atena"
        ></img>
      </div>
      </div>
    </nav>
  );
};

export default Navigation;





// import { NavLink } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../Api/firebase";
// import styles from "./Navigation.module.css";
// import logo from "./atena_logo1.png";
// import avatar from "./atena_avatar1.png";

// const Navigation = ({isAuth, email}) => {
//   return (
//     <nav className={styles.navigation}>
//       <img className={styles.logoAtena} src={logo} alt="logo Atena"></img>
//       <div className={styles.navigationDetails}>
//         <div className={styles.btnWrapper}>
//           {!isAuth && (
//             <>
//               <NavLink to="auth/signin">
//                 <button>Zaloguj się</button>
//               </NavLink>
//               <NavLink to="auth/signup">
//                 <button>Zarejestruj się</button>
//               </NavLink>
//             </>
//           )}
//           {isAuth && (
//             <>
//               <NavLink to="admin">
//                 <button className={styles.btn}>Panel klienta</button>
//               </NavLink>
//             </>
//           )}
//           <button className={styles.btn} onClick={() => signOut(auth)}>
//             Wyloguj się
//           </button>
//         </div>
//       </div>
//       <div className={styles.avatarWrapper}>
//         <img
//           className={styles.avatarAtena}
//           src={avatar}
//           alt="avatar Atena"
//         ></img>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
