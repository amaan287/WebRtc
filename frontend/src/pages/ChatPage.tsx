import { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";

export default function ChatPage() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="h-[95vh]">
        {messages.map((message) => (
          <div className="m-8">
            <span className="bg-white text-black rounded p-4 ">{message}</span>
          </div>
        ))}
      </div>
      <div className="h-[5vh] w-full bg-white flex">
        <ChatBox wsRef={wsRef} />
      </div>
    </div>
  );
}
