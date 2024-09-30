"use server";
import { revalidatePath } from "next/cache";

export const removeBotFromList = (
  listBot: { name: string; key: string; type: string }[],
  key: string
) => {
  if (!listBot) throw new Error("Error while trying to remove bot");

  const newList = listBot.filter(
    (item: { name: string; key: string; type: string }) => {
      return item.key !== key;
    }
  );

  revalidatePath("/dashboard", "layout");
  revalidatePath("/dashboard/[id]", "layout");

  return newList;
};
