const Chats = () => {
  return (
    <article className="flex gap-3 md:gap-4 p-3 md:p-4 border-b cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200  transition-colors">
      <div className="flex-shrink-0">
        <img
          src="./pfp.jpeg"
          alt="pfp"
          className="h-12 w-12 md:h-14 md:w-14 object-cover rounded-full border"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-semibold text-sm md:text-base truncate">
            Prateet Tiwari
          </h1>
          <span className="text-xs text-gray-500 flex-shrink-0">2h</span>
        </div>
        <p className="text-gray-400 text-xs md:text-sm truncate">
          Hey! How are you?
        </p>
      </div>
    </article>
  );
};

export default Chats;
