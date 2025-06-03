"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useCommandPalette } from "@/components/custom/guidance/context/command-palette-context";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { setOpen } = useCommandPalette(); // Use context

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
        <Input
          placeholder="Search surahs, verses, topics... (⌘K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onClick={() => setOpen(true)} // Open command palette directly
          className={`pl-9 pr-4 py-5 text-sm bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984] transition-all ${
            isSearchFocused ? "border-[#fe8019]" : ""
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Badge className="bg-[#3c3836] text-[#a89984] text-xs">⌘K</Badge>
        </div>
      </div>
    </div>
  );
};

export default Search;
