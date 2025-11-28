import FeedCard from "../components/FeedCard.jsx";
import Left from "../components/Left.jsx";
import Right from "../components/Right.jsx";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl">
      {/* Left Sidebar - Fixed width */}
      <div className="w-22 border-r border-gray-300 dark:border-gray-800 lg:w-64 xl:w-72 shrink-0">
        <Left />
      </div>

      {/* Center Feed - Flexible, with max width */}
      <div className="flex-1 min-w-0 max-w-2xl flex flex-col items-center mx-auto">
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>

  
    </main>
  );
};

export default Home;
