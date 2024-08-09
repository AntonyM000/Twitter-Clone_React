import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Notification from "./pages/Notifications";
import Message from "./pages/Message";
import Profile from "./pages/Profile";






function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/notification" element={<Notification/>}/>
            <Route path="/message" element={<Message/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Route>
        {/* <Route index element={<Dashboard/>} /> */}

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
