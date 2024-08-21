import { type ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { type Track } from "@/app/(player)/playlist/TrackTable";
import { Button } from "@/components/ui/button";
import ColumnSortIcon from "@/components/icons/ColumnSortIcon";
import Link from "@/components/Link";
import SearchHighlight from "@/components/SearchHighlight";

const artistColumn: ColumnDef<Track, string> = {
  id: "artists",
  sortingFn: "text",
  filterFn: "includesString",
  accessorFn: (row) => row.artists.map((artist) => artist.name).join(", "),
  header: ({ column }) => (
    <Button
      variant="ghost"
      className="pl-0 gap-2 justify-start hover:bg-inherit"
      onClick={() => column.toggleSorting()}
    >
      Artist
      <ColumnSortIcon sorting={column.getIsSorted()} />
    </Button>
  ),
  cell: ({ row, table }) => {
    const artists = row.original.artists satisfies Track["artists"];
    return (
      <div className="text-muted-foreground truncate line-clamp-1 whitespace-normal break-all">
        {artists.map(({ id, name, type }, i) => (
          <Fragment key={id}>
            <Link
              href={`/${type}/${id}`}
              number="list"
              className="group-hover/row:text-primary"
            >
              <SearchHighlight
                text={name}
                search={[table.getState().globalFilter as string]}
              />
            </Link>
            {i < artists.length - 1 ? ", " : null}
          </Fragment>
        ))}
      </div>
    );
  },
};

export default artistColumn;
