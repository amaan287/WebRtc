import { useEffect, useState } from "react";

export default function WSHooks() {
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
  }, []);

  return messages;
}
