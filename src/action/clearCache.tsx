"use server";

import { revalidatePath } from "next/cache";

export const clearCacheByServerAction = async (path: string) => {
  try {
    if (path) revalidatePath(path);
    else {
      revalidatePath("/dashboard");
    }
  } catch (error) {
    console.error("clear cached faild", error);
  }
};
