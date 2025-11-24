import FeedCard from "./FeedCard";

const ProfileCard = () => {
  return (
    <main className="w-full max-w-3xl p-8 flex flex-col gap-6">
      <div className="flex  justify-center gap-20 flex-shrink-0">
        <div className="justify-center flex items-center">
          <img
            src="./pfp.jpeg"
            alt=""
            className="w-35 h-35 object-contain rounded-full p-1 border"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <h1 className="text-2xl font-semibold">Prateet Tiwari</h1>
            <p className="text-gray-400">@prateettiwari</p>
          </div>
          <div className="flex gap-2">
            <p>50 Posts</p>
            <p>1.2K Followers</p>
            <p>300 Following</p>
          </div>
          <div>
            <p className="max-w-md">
              Software Engineer | Tech Enthusiast | Open Source Contributor.
              Love coding and coffee!
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 border-b pb-12 justify-center flex-shrink-0 w-full truncate">
        <button className="px-16 py-2 w-full rounded-2xl bg-gray-600">
          Follow
        </button>
        <button className="px-16 py-2 w-full rounded-2xl bg-gray-600">
          Message
        </button>
      </div>
      <div className="flex flex-col gap-6 pt-6">
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
    </main>
  );
};

export default ProfileCard;
