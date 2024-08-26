import Highlighter from "react-highlight-words";

interface SearchHighlightProps {
  text: string;
  search: string[];
}

export default function SearchHighlight({
  text,
  search,
}: SearchHighlightProps) {
  if (search.length) {
    return (
      <Highlighter
        searchWords={search}
        textToHighlight={text}
        highlightClassName="bg-green-500/60 text-primary rounded-sm"
      />
    );
  }
  return text;
}
