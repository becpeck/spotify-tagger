"use client";

import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  const { name, spotifyId, images } = session.user;

  return (
    <header className="flex items-center pe-4 py-4">
      <nav className="flex justify-between items-center w-full">
        <Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
          <h1 className="text-xl font-semibold">Spotify Tagger</h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full group">
            <Avatar className="">
              <AvatarImage src={images[0]?.url} />
              <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-semibold">
              <Link href={`/user/${spotifyId}`}>{name}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
