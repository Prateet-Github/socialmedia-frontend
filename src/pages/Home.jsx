import {
  Bell,
  HomeIcon,
  Mail,
  MoreVertical,
  MoreVerticalIcon,
  PresentationIcon,
  Search,
  User2,
} from "lucide-react";
import { Link } from "react-router-dom";
import FeedCard from "../components/FeedCard.jsx";

const Home = () => {
  return (
    <main className="flex min-h-screen max-w-7xl w-full mx-auto">
      <div className="w-1/4 h-screen sticky border-r flex flex-col items-center justify-between py-6 px-10 top-0">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-4xl px-4">Social Media</h1>
          <Link
            to="/login"
            className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <HomeIcon />
            <p>Home</p>
          </Link>
          <Link
            to="/login"
            className="flex  gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <Search />
            <p>Search</p>
          </Link>
          <Link
            to="/login"
            className="flex  gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <Bell />
            <p>Notifications</p>
          </Link>
          <Link
            to="/login"
            className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <Mail />
            <p>Messages</p>
          </Link>
          <Link
            to="/login"
            className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <PresentationIcon />
            <p>Premium</p>
          </Link>
          <Link
            to="/login"
            className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <User2 />
            <p>Profile</p>
          </Link>
          <Link
            to="/login"
            className="flex gap-4 w-full px-4 py-3 hover:bg-gray-300 hover:text-black rounded-4xl"
          >
            <MoreVertical className="border-2 rounded-full" />
            <p>More</p>
          </Link>

          <button className="w-full py-3 rounded-4xl bg-white text-black cursor-pointer hover:bg-gray-300">
            Post
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full text-white rounded-4xl py-3 px-8 hover:bg-gray-300 cursor-pointer">
            <img src="pfp.jpeg" alt="pfp" className="size-10 rounded-full" />
            <div className="flex flex-col">
              <p>name</p>
              <p>username</p>
            </div>
            <Link to="/login" className="">
              <MoreVerticalIcon></MoreVerticalIcon>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-2/4 flex flex-col justify">
        {/* <div className="border-b py-5 px-10 flex items-center gap-4">
          <div className="flex flex-col gap-2 w-20">
            <img
              src="pfp.jpeg"
              className="w-20 h-20 rounded-full object-cover"
              alt="story"
            />
            <p className="truncate text-center w-full">prateet_tiwarii</p>
          </div>

          <div className="flex flex-col gap-2 w-20">
            <img
              src="pfp.jpeg"
              className="w-20 h-20 rounded-full object-cover"
              alt="story"
            />
            <p className="truncate text-center w-full">Usernameeeeee</p>
          </div>

          <div className="flex flex-col gap-2 w-20">
            <img
              src="pfp.jpeg"
              className="w-20 h-20 rounded-full object-cover"
              alt="story"
            />
            <p className="truncate text-center w-full">Usernameeeeee</p>
          </div>

          <div className="flex flex-col gap-2 w-20">
            <img
              src="pfp.jpeg"
              className="w-20 h-20 rounded-full object-cover"
              alt="story"
            />
            <p className="truncate text-center w-full">Usernameeeeee</p>
          </div>
        </div> */}

        <div>
          <FeedCard />
        </div>
      </div>
      <div className="w-1/4 border-l h-screen top-0 sticky px-4 py-6 flex flex-col gap-4">
        <h1 className="font-bold">Suggested for you</h1>

        <div className="flex items-center gap-3 p-3">
          {/* Profile Picture */}
          <img
            src="pfp.jpeg"
            alt="pfp"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Username */}
          <p className="text-white font-medium flex-1 min-w-0">
            suggested_user
          </p>

          {/* Follow Button */}
          <button className="px-3 py-1.5 bg-white text-black cursor-pointer text-sm font-semibold rounded-full  transition-colors whitespace-nowrap">
            Follow
          </button>
        </div>
        <div className="flex items-center gap-3 p-3">
          {/* Profile Picture */}
          <img
            src="pfp.jpeg"
            alt="pfp"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Username */}
          <p className="text-white font-medium flex-1 min-w-0">
            suggested_user
          </p>

          {/* Follow Button */}
          <button className="px-3 py-1.5  bg-white text-black cursor-pointer text-sm font-semibold rounded-full transition-colors whitespace-nowrap">
            Follow
          </button>
        </div>
        <div className="flex items-center gap-3 p-3">
          {/* Profile Picture */}
          <img
            src="pfp.jpeg"
            alt="pfp"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Username */}
          <p className="text-white font-medium flex-1 min-w-0">
            suggested_user
          </p>

          {/* Follow Button */}
          <button className="px-3 py-1.5  bg-white text-black cursor-pointer text-sm font-semibold rounded-full  transition-colors whitespace-nowrap">
            Follow
          </button>
        </div>
        <div className="flex items-center gap-3 p-3">
          {/* Profile Picture */}
          <img
            src="pfp.jpeg"
            alt="pfp"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Username */}
          <p className="text-white font-medium flex-1 min-w-0">
            suggested_user
          </p>

          {/* Follow Button */}
          <button className="px-3 py-1.5  bg-white text-black cursor-pointer text-sm font-semibold rounded-full transition-colors whitespace-nowrap">
            Follow
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
