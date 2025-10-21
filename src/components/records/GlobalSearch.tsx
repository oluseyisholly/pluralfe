import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export interface GlobalSearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
}

export function GlobalSearch({
  placeholder = "Find patient",
  onSearch,
  delay = 250,
}: GlobalSearchProps) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const handle = window.setTimeout(() => {
      onSearch(value.trim());
    }, delay);

    return () => window.clearTimeout(handle);
  }, [value, delay, onSearch]);

  return (
    <label className="relative flex w-full max-w-xl items-center">
      <Search className="absolute left-4 h-5 w-5 text-slate-400" aria-hidden="true" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="pl-12 pr-4"
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </label>
  );
}
