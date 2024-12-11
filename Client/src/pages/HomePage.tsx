import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { connect } from "http2";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function HomePage() {
  const socket = io(`http://localhost:3000`);
  const [name, setName] = useState<string>("");
  const [channel, setChannel] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });
    socket.on("Connected to server", (data) => {
      console.log(data);
    });
  });

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
          <Input
            type="text"
            className="w-64"
            placeholder="Enter channel name"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
          <Button className="w-32">Call</Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>{renderHelper()}</div>
      <div>
        <video src=""></video>
      </div>
    </div>
  );
}
