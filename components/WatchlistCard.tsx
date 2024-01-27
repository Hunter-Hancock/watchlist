"use client";

import { removeItem } from "@/app/_actions";
import TrashCanIcon from "./TrashCanIcon";

interface WatchlistCardProps {
  item: {
    id: number;
    category: string;
    title: string;
    type: string;
    user_id: string;
    watched: boolean;
    created_at: string;
    image_url: string;
  };
}

export default async function WatchlistCard({ item }: WatchlistCardProps) {
  return (
    <div className="relative flex flex-col border-2 border-neutral-300 rounded-md w-[300px] group">
      <div
        onClick={() => removeItem(item.id)}
        className="absolute right-2 top-2 md:hidden rounded-full cursor-pointer group-hover:block">
        <TrashCanIcon />
      </div>
      <img
        className="w-full h-[400px] rounded-t-md"
        src={item.image_url ?? "https://via.placeholder.com/300x400"}
        alt={item.title}
      />
      <h1 className="text-xl text-center mt-2">{item.title}</h1>
      <div className="flex justify-between text-center items-center">
        <h1 className="font-thin m-2 p-1 border-2">{item.category}</h1>
        <h1 className="font-thin m-2 p-1 border-2">{item.type}</h1>
      </div>
    </div>
  );
}
