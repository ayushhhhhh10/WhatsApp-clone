import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{ user }] = useStateValue();
  return (
    <div className="w-full h-screen bg-[#dadbd3] flex items-center justify-center">
      {!user ? (
        <Login />
      ) : (
        <div className="w-full md:w-[90vw] h-full md:h-[90vh] bg-zinc-100 shadow-2xl flex flex-col md:flex-row">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
