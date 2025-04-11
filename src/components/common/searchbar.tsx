import { useEffect, useState } from "react";
import SearchIcon from "@/icons/SearchIcon";
import CloseIcon from "@/icons/closeIcon";
interface SearchbarProps {
  onSearch: (value: string) => void;
  toogle?: boolean;
}

export default function Searchbar({ onSearch, toogle }: SearchbarProps) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };
  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  useEffect(() => {
    if (!toogle) {
      handleClear();
    }
  }, [toogle]);

  return (
    <div className="relative w-full">
      <input
        className="pl-10 pr-10 text-[16px] bg-inputBackground placeholder:text-black placeholder:opacity-[0.45] rounded-full placeholder:text-sm outline-none h-[50px] w-full text-black font-normal border border-solid border-black"
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search Crops..."
      />
      <div className="absolute top-[50%] translate-y-[-50%] left-3 flex items-center cursor-pointer">
        <SearchIcon />
      </div>
      {searchText && (
        <div
          className="absolute top-[50%] translate-y-[-50%] right-3 flex items-center cursor-pointer"
          onClick={handleClear}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
}
