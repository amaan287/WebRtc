import { useRef, RefObject, JSX } from "react";

interface ChatBoxProps {
  wsRef: RefObject<WebSocket | null>;
}

export default function ChatBox({ wsRef }: ChatBoxProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex h-full rounded-lg w-full">
      <input
        ref={inputRef}
        id="message"
        className="h-full w-full flex-1 p-4"
      ></input>
      <button
        onClick={() => {
          const message = inputRef.current?.value;
          wsRef.current?.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message: message,
              },
            })
          );
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
        className="bg-purple-600 text-white p-4 rounded-lg"
      >
        Send message
      </button>
    </div>
  );
}
