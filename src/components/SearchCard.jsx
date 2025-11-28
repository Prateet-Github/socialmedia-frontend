import { Search } from "lucide-react";

const SearchCard = () => {
  return (
    <div className="p-4 w-full">
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-full bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-950 transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchCard;
