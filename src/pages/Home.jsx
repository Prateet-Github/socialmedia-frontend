import FeedCard from "../components/FeedCard.jsx";
import Left from "../components/Left.jsx";
import Right from "../components/Right.jsx";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="w-1/4">
        <Left />
      </div>
      <div className="w-1/2 border-x">
        <FeedCard />
      </div>
      <div className="w-1/4">
      <Right/>
      </div>
    </main>
  );
};

export default Home;
