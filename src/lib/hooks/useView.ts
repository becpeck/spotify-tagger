import { useState } from "react";

export type View = "list" | "compact";

type ViewVisibilityState = {
  title: boolean;
  artist: boolean;
  "title/artist": boolean;
};

const COLUMN_VISIBILITIES: Record<View, ViewVisibilityState> = {
  list: { title: false, artist: false, "title/artist": true },
  compact: { title: true, artist: true, "title/artist": false },
} as const;

export default function useView(initialView: View) {
  const [view, setView] = useState(initialView);
  const [columnVisibility, setColumnVisibility] = useState<ViewVisibilityState>(
    COLUMN_VISIBILITIES[view]
  );

  const updateView = (newView: View) => {
    if (newView !== view) {
      setView(newView);
      setColumnVisibility(COLUMN_VISIBILITIES[newView]);
    }
  };

  return {
    view,
    columnVisibility,
    updateView,
    onColumnVisibilityChange: () => setColumnVisibility,
  };
}
