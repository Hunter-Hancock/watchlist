"use server";

import { createClient } from "@/utils/supabase/actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signInEmail = async (formData: FormData) => {
  const cookieStore = cookies();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient(cookieStore);

  if (!email || !password) {
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export async function addItem(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const type = formData.get("type") as string;

  if (!title || !category || !type || !user) {
    redirect("/?error=You must add a title, category, and type");
  }

  const request = await fetch(
    `https://customsearch.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_KEY}&cx=d33879e09d50c4c43&q=${title} ${type}&searchType=image`
  );

  const response = await request.json();

  const image = response.items[0].link;

  const { error } = await supabase.from("watchlist").insert({
    title,
    category,
    type,
    user_id: user?.id,
    image_url: image ?? "",
  });

  if (error) {
    redirect("/?error=Unable to add item to watchlist");
  }

  revalidatePath("/");
  redirect("/");
}

export async function removeItem(id: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("watchlist").delete().eq("id", id);

  if (error) {
    redirect("/?error=Unable to remove item from watchlist");
  }

  revalidatePath("/");
}
