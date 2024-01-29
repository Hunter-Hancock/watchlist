"use client";

import { removeItem } from "@/app/_actions";
import { useFormStatus } from "react-dom";
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

function DeleteButton({ id }: { id: number }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="absolute right-2 top-2 md:hidden rounded-full cursor-pointer group-hover:block"
      type="submit">
      <TrashCanIcon />
      {pending ? (
        <div className="absolute right-[120px] top-[200px] w-10 h-10 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
      ) : (
        ""
      )}
    </button>
  );
}

export default async function WatchlistCard({ item }: WatchlistCardProps) {
  return (
    <form
      action={() => removeItem(item.id)}
      className="relative flex flex-col justify-between border-2 border-neutral-300 rounded-md w-[300px] group">
      <DeleteButton id={item.id} />
      <img
        className="w-full h-[400px] rounded-t-md"
        src={item.image_url ?? "https://via.placeholder.com/300x400"}
        alt={item.title}
      />
      <h1 className="text-xl text-center mt-2 px-4 truncate hover:whitespace-normal hover:overflow-visible">
        {item.title}
      </h1>
      <div className="flex justify-between text-center items-center">
        <h1 className="font-thin m-2 p-1 border-2">{item.category}</h1>
        <h1 className="font-thin m-2 p-1 border-2">{item.type}</h1>
      </div>
    </form>
  );
}
