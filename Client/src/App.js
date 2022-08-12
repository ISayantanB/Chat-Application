import Header from "./Components/header";
import Signin from "./Components/signin";
import Login from "./Components/login";
import Chat from "./Components/chat";
import Profile from "./Components/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const headerCommon = <Header />
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={headerCommon} />
          <Route path="/signin" element={<>{headerCommon}<Signin /></>} />
          <Route path="/login" element={<>{headerCommon}<Login /></>} />
          <Route path="/user" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
