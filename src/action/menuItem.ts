"use server";
import { revalidatePath } from "next/cache";

export const handleRemove = (apiKey: string | undefined, listBot: []) => {
  if (apiKey) {
    if (!listBot) return;

    const data = listBot.filter((item: any) => {
      return item.key !== apiKey;
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/[id]");
    return data;
  } else {
    console.log("this is chat");
  }
};
