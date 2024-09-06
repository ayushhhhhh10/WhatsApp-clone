import {
  AttachFile,
  DeleteOutline,
  DeleteOutlineOutlined,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";

import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from "../Firebase";

const Chat = () => {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchRoomName = async () => {
      if (roomId) {
        const roomDoc = doc(db, "rooms", roomId);
        const roomSnapshot = await getDoc(roomDoc);
        if (roomSnapshot.exists()) {
          setroomName(roomSnapshot.data().name);
        }
        const q = query(
          collection(db, "rooms", roomId, "messages"),
          orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });

        return unsubscribe;
      }
    };

    fetchRoomName();
  }, [roomId]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    addDoc(collection(db, "rooms", roomId, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });
    setinput("");
  };
  return (
    <div className="w-full sm:w-[65%] flex flex-col">
      <div className="chat_header p-2 flex items-center border-b">
        <Avatar
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}`}
        />
        <div className="w-full pl-4">
          <h3 className="text-lg font-semibold">{roomName}</h3>
          <p className="text-xs opacity-70">{`Last seen at ${new Date(
            messages[messages.length - 1]?.timestamp?.toDate()
          ).toUTCString()}`}</p>
        </div>
        <div className="flex">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] h-full bg-cover p-8 overflow-y-auto overflow-x-hidden">
        {messages.map((message, index) => (
          <p
            key={index}
            className={` ${
              message.name === user.displayName
                ? "ml-auto bg-[#dcf8c6] w-fit p-2 rounded-md relative mb-6 shadow-md"
                : "w-fit bg-white p-2 rounded-md relative mb-6 shadow-md"
            }`}
          >
            <span className="absolute -top-4 left-1 text-[10px] font-bold">
              {message.name}
            </span>
            {message.message}
            <span className="text-[10px] ml-2 opacity-60">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer flex p-2 justify-between items-center text-zinc-500">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form className="flex w-full items-center text-black">
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-md p-2 text-sm"
            type="text"
          />
          <button onClick={sendMessage} type="submit" className="hidden">
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
