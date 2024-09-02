import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  inputValue: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleClearInput: () => void;
}

export default function SearchInput({
  inputValue,
  handleInputChange,
  handleClearInput,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-48">
      <label
        htmlFor="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 transform"
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Search</span>
      </label>
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        className="px-10"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <button
          onClick={handleClearInput}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform"
          aria-label="Clear search"
        >
          <XIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
