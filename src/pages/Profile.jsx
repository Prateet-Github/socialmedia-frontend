import Left from "../components/Left";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="w-1/4">
        <Left />
      </div>
      <div className="w-3/4 flex justify-center">
        <ProfileCard />
      </div>
    </main>
  );
};

export default Profile;
