const Chats = () => {
  return (
    <main className="flex gap-4 p-4 border-b cursor-pointer">
      <div className="flex justify-center items-center">
        <img
          src="./pfp.jpeg"
          alt="pfp"
          className="h-14 w-14 object-cover rounded-full border"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold">Prateet Tiwari</h1>
        <p className="text-gray-400 text-sm">Hey! How are you?</p>
      </div>
    </main>
  );
};

export default Chats;
