import Chats from "./Chats";

const Dm = () => {
  return (
    <main className="overflow-y-auto h-screen">
      <div className="sticky top-0 z-50 bg-white">
        <h1 className="text-2xl font-semibold px-4 pt-2">Messages</h1>

        <div className="flex relative py-4 px-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-10 border border-gray-700 outline-none w-full rounded-full focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
    </main>
  );
};

export default Dm;
