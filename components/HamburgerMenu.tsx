"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function HamburguerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 50 50"
          className="text-blue-500 fill-current">
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black border-2 ml-5 flex flex-col gap-2 z-10">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <Link
          href={"/?category=All"}
          className="border-2 border-blue-600 px-6 py-2 rounded-mdz-10">
          All
        </Link>
        <Link
          href={"/?category=TV"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          TV
        </Link>
        <Link
          href={"/?category=Manga"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          Manga
        </Link>
        <Link
          href={"/?category=Anime"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          Anime
        </Link>
        <Link
          href={"/?category=Movie"}
          className="border-2 border-blue-600 px-6 py-2 rounded-md">
          Movies
        </Link>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
