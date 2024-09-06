import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../Firebase";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setseed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    const fetchMessages = () => {
      if (id) {
        const q = query(
          collection(db, "rooms", id, "messages"),
          orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });

        return unsubscribe;
      }
    };

    const unsubscribe = fetchMessages();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      addDoc(collection(db, "rooms"), { name: roomName });
    }
  };

  const deleteChat = async () => {
    if (window.confirm("Are you sure you want to delete this chat room?")) {
      await deleteDoc(doc(db, "rooms", id));
      const messagesSnapshot = await getDocs(
        collection(db, "rooms", id, "messages")
      );
      messagesSnapshot.forEach(async (messageDoc) => {
        await deleteDoc(doc(db, "rooms", id, "messages", messageDoc.id));
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="flex p-4 gap-3 border-b items-center justify-between hover:bg-[#ebebeb] cursor-pointer duration-300">
        <div className="flex gap-5">
          <Avatar
            src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}`}
          />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm opacity-70">{messages[0]?.message}</p>
          </div>
        </div>
        <IconButton onClick={deleteChat}>
          <DeleteOutline />
        </IconButton>
      </div>
    </Link>
  ) : (
    <div
      className="text-xl font-bold p-4 border-b tracking-tight hover:bg-[#ebebeb] cursor-pointer"
      onClick={createChat}
    >
      <h1>Add New Chat</h1>
    </div>
  );
};

export default SidebarChat;
