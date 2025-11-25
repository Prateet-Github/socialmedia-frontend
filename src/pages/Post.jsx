import Left from "../components/Left";
import PostCard from "../components/PostCard";

const Post = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-7xl">
      {/* Left Sidebar - Fixed width */}
      <div className="w-22 lg:w-64 xl:w-72 shrink-0">
        <Left />
      </div>

      {/* Center Feed - Flexible, with max width */}
      <div className="flex-1 min-w-0 max-w-2xl">
        <PostCard />
      </div>

      {/* Right Sidebar - Fixed width, hidden on small screens */}
      <div className="hidden border-l lg:block w-80 xl:w-96 shrink-0">
        {/* <Right /> */}
      </div>
    </main>
  );
};

export default Post;
