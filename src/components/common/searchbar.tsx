import { useState } from "react";
import SearchIcon from "@/icons/SearchIcon";
import VoiceIcon from "@/icons/voiceIcon";
interface SearchbarProps {
  onSearch: (value: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <input
        className="pl-5 pr-10 text-sm bg-inputBackground placeholder:text-black placeholder:opacity-[0.45] rounded-full placeholder:text-sm outline-none h-[50px] w-full text-black font-normal border border-solid border-black"
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search Crops..."
      />
      <div className="absolute top-[50%] translate-y-[-50%] right-3 flex items-center cursor-pointer">
        <SearchIcon />
      </div>
    </div>
  );
}
