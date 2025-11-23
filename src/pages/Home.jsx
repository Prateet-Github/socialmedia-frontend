import FeedCard from "../components/FeedCard.jsx";
import Left from "../components/Left.jsx";
import Right from "../components/Right.jsx";

const Home = () => {
  return (
    <main className="flex min-h-screen max-w-7xl w-full mx-auto">
      <div className="w-1/4">
        <Left />
      </div>
      <div className="w-2/4">
        <FeedCard />
      </div>
      <div className="w-1/4 border-l">
      <Right/>
      </div>
    </main>
  );
};

export default Home;
