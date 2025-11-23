import { Search } from "lucide-react";

const SearchCard = () => {
  return (
    <main className="p-4 border flex relative">
      <Search className="absolute left-10 top-6" />
      <input
        type="text"
        placeholder="           Search"
        className="p-2 border w-full rounded-full"
      />
    </main>
  );
};

export default SearchCard;
