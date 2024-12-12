import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export default function HomePage() {
  const socket = useMemo(() => {
    return io(`http://localhost:3000`);
  }, []);
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [receiveMessage, setReceiveMessage] = useState<string[] | string>([]);
  const [socketId, setSocketId] = useState<string>("");
  console.log(receiveMessage);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
      setSocketId(socket.id || "");
    });

    socket.on("receive message", (message) => {
      console.log(message);
      setReceiveMessage(message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  function handleMessageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket.emit("message", { message, room });
    console.log(message, room);
    setMessage("");
  }
  const renderHelper = () => {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="flex flex-col items-center justify-center max-w-4xl gap-2">
          <Input
            type="text"
            className="w-64"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button className="w-32">Call</Button>
        </div>
      </div>
    );
  };
  const Message = () => {
    return (
      <div>
        <form onSubmit={handleMessageSubmit}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="enter a message"
          />
          <Input
            type="text"
            className="w-64"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Textarea disabled value={receiveMessage} />
          <Button type="submit">Send</Button>
          <p>{socketId}</p>
        </form>
      </div>
    );
  };
  return (
    <div>
      <div>{renderHelper()}</div>
      <div>{Message()}</div>
      <div>
        <video src=""></video>
      </div>
    </div>
  );
}
