import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SidebarChat from "./SidebarChat";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../Firebase";
import { useStateValue } from "../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="m-1 py-2 px-1 w-[35%] h-full border-r-2 flex flex-col">
      <div className="sidebar_header flex items-center justify-between">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_header_right flex text-zinc-600">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search text-zinc-500 flex gap-2 items-center bg-[#f6f6f6] p-2 my-5 rounded-md text-sm shadow-lg">
        <SearchOutlined />
        <input
          className="bg-[#f6f6f6] p-1 w-full"
          placeholder="Search or start new chat"
          type="text"
        />
      </div>
      <div className="sidebar_chats bg-white h-full overflow-auto">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
