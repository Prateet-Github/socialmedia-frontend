import FeedCard from "../components/FeedCard.jsx";
import Left from "../components/Left.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFeed } from "../redux/postSlice";

const Home = () => {
  // redux
  const { items, loading, error } = useSelector((state) => state.posts);

  // hooks
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  // JSX
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-6xl pt-16 lg:pt-0">
      {/* Left Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 border-r border-gray-200/60 dark:border-gray-800/60">
        <Left />
      </div>

      {/* Mobile hamburger menu */}
      <div className="lg:hidden">
        <Left />
      </div>

      <div className="flex-1 min-w-0 max-w-2xl flex flex-col items-center mx-auto">
        {loading && (
          <p className="text-gray-400 text-center mt-10">Loading feed…</p>
        )}
        {error && <p className="text-red-500 text-center mt-10">{error}</p>}

        {!loading &&
          items.map((post) => <FeedCard key={post._id} post={post} />)}

        {!loading && items.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No posts yet. Follow someone or create a post.
          </p>
        )}
      </div>
    </main>
  );
};

export default Home;
