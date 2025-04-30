export default function JoinRoom() {
  return (
    <div className="flex flex-col items-center justify-center w-4xl gap-4 border p-4 border-white">
      <div className="flex flex-row gap-2 w-full">
        <input
          type="text"
          placeholder="enter room code"
          className="flex-1 h-12 rounded-lg border border-white px-4"
        />
        <button className="w-fit bg-purple-600 rounded-lg h-12 px-2">
          Create Room
        </button>
      </div>
      <button className="p-2 bg-purple-500 rounded-lg text-white font-semibold">
        Join Room
      </button>
    </div>
  );
}
