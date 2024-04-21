// import React from 'react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type HeaderProps = {
  imageUrl?: string;
  username: string;
}

export default function Header({ imageUrl, username }: HeaderProps) {
	return (
    <header className="flex items-center pe-4 py-4">
      <nav className="flex justify-between items-center w-full">
        <Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
          <h1 className="text-xl font-semibold">Spotify Tagger</h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full group">
            <Avatar className="border-2 group-hover:border-zinc-500">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="font-semibold">
              <Link href={`/user/${username}`}>
                {username}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
	);
}
