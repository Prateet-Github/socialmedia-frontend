import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const FeedCard = () => {
  return (
    <article className="flex border-b p-3 md:p-6 gap-2 md:gap-3 hover:bg-gray-950 transition-colors">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src="/pfp.jpeg"
          alt="profile"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 md:gap-4 w-full min-w-0">
        {/* Username + Time */}
        <div className="flex items-center gap-2">
          <h1 className="font-semibold hover:underline cursor-pointer text-sm md:text-base truncate">
            Prateet Tiwari
          </h1>
          <span className="text-gray-500 text-xs md:text-sm">•</span>
          <p className="text-gray-400 text-xs md:text-sm flex-shrink-0">2h</p>
        </div>

        {/* Text */}
        <p className="text-sm md:text-base leading-relaxed">
          So, there is a free and open-source alternative to Netflix available -
          it's known as Stremio.
        </p>

        {/* Image */}
        {/* Image */}
        <div className="border border-gray-600 max-h-140 w-fit overflow-hidden rounded-xl md:rounded-2xl">
          <img
            src="/pfp.jpeg"
            className="w-full h-full object-contain cursor-pointer hover:opacity-95 transition-opacity"
            alt="post content"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between text-gray-400 -mx-2">
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800 hover:text-red-500 transition-colors group">
            <Heart className="size-4 md:size-5 group-hover:fill-red-500" />
            <span className="text-xs md:text-sm hidden sm:inline">Like</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800 hover:text-blue-500 transition-colors group">
            <MessageCircle className="size-4 md:size-5" />
            <span className="text-xs md:text-sm hidden sm:inline">Comment</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800 hover:text-green-500 transition-colors group">
            <Share2 className="size-4 md:size-5" />
            <span className="text-xs md:text-sm hidden sm:inline">Share</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800 hover:text-yellow-500 transition-colors group">
            <Bookmark className="size-4 md:size-5 group-hover:fill-yellow-500" />
            <span className="text-xs md:text-sm hidden sm:inline">Save</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;
