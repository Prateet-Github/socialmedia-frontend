const FeedCard = () => {
  return (
    <main className="flex border-y p-6 gap-3">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src="/pfp.jpeg"
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 w-full">
        {/* Username + Time */}
        <div className="flex items-center gap-2">
          <h1 className="font-semibold hover:underline cursor-pointer">
            Prateet Tiwari
          </h1>
          <p className="text-gray-400 text-sm">2h ago</p>
        </div>

        {/* Text */}
        <p className="text-sm leading-5">
          So, there is a free and open-source alternative to Netflix available —
          it's known as Stremio.dfghfghjfgh
        </p>

        {/* Image */}
        <div className="border max-h-140 w-fit overflow-hidden rounded-xl">
          <img
            src="/pfp.jpeg"
            className="w-full h-full object-contain"
            alt="post content"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between text-sm text-gray-300 px-2">
          <button className="hover:text-white">Like</button>
          <button className="hover:text-white">Comment</button>
          <button className="hover:text-white">Share</button>
        </div>
      </div>
    </main>
  );
};

export default FeedCard;
