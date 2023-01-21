import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Layout/>}>
          {/* <Route path="home" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="searching" element={<SearchingSite />} />
          <Route path="details/:bookTitle" element={<BookDetails />} />
          <Route path="user/:userName" element={<UserProfile />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
