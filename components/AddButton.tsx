"use client";

import { addItem } from "@/app/_actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="border-2 p-2 bg-neutral-50"
      type="submit"
      aria-disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}

export default function AddButton() {
  const movieGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "Documentary",
    "Historical",
    "Musical",
  ];

  const types = ["Movie", "TV", "Manga", "Anime"];
  return (
    <Dialog>
      <DialogTrigger>Add</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Item to your Watchlist</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-2" action={addItem}>
              <input
                className="p-2"
                type="text"
                name="title"
                placeholder="Title"
                required
              />
              <select className="p-2" name="category">
                {movieGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <select className="p-2" name="type">
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <DialogClose asChild>
                <SubmitButton />
              </DialogClose>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
