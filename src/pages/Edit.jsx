import Left from "../components/Left";
import EditProfile from "../components/EditProfile";

const Edit = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto max-w-7xl">
      {/* Left Sidebar - Fixed width */}
      <div className="w-22 lg:w-64 xl:w-72 shrink-0 border-r">
        <Left />
      </div>

      {/* Profile Content - Centered with max width */}
      <div className="flex-1 min-w-0 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <EditProfile />
        </div>
      </div>
    </main>
  );
};

export default Edit;
