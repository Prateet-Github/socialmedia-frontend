import FeedCard from "../components/FeedCard.jsx";
import Left from "../components/Left.jsx";

const Home = () => {
  return (
    <main className="flex min-h-screen max-w-7xl w-full mx-auto">
      <div className="w-1/4">
        <Left />
      </div>
      <div className="w-2/4">
        <FeedCard />
      </div>
      <div className="w-1/4 border-l h-screen top-0 sticky px-4 py-6 flex flex-col gap-4"></div>
    </main>
  );
};

export default Home;
