import { useDispatch, useSelector } from "react-redux";
import { searchUsers, clearSearchResults } from "../redux/userSearchSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading } = useSelector((state) => state.userSearch);
  const { user } = useSelector((state) => state.auth); // <-- ADD THIS

  const [query, setQuery] = useState("");

  // debounce
  useEffect(() => {
    if (query.trim() === "") {
      dispatch(clearSearchResults());
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(searchUsers(query));
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const goToUser = (u) => {
    if (u.username === user.username) {
      navigate("/profile");
    } else {
      navigate(`/user/${u.username}`);
    }
  };

  return (
    <div className="px-4 py-6 w-full max-w-2xl mx-auto">
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full border border-gray-600 p-3 rounded-full bg-transparent"
      />

      <div className="mt-5 flex flex-col gap-4">
        {loading && <p>Searching...</p>}

        {!loading &&
          results.map((u) => (
            <div
              key={u._id}
              className="flex gap-3 items-center cursor-pointer hover:bg-gray-800 p-2 rounded-xl"
              onClick={() => goToUser(u)}   // <-- FIXED
            >
              <img
                src={
                  u.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                    u.name
                  )}`
                }
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-400">@{u.username}</p>
              </div>
            </div>
          ))}

        {!loading && query && results.length === 0 && (
          <p className="text-gray-400">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;