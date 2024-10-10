import { decrypt, encrypt } from "@/lib/secretKey";

export const initialStart = () => {
  // apikey list
  if (localStorage.getItem("apiKey") === null) {
    localStorage.setItem(
      "apiKey",
      JSON.stringify([
        {
          name: "ChatX support",
          key: encrypt("app-qQppSgsAKdKQ2nw8NRE6xXAs"),
          type: "Agent"
        }
      ])
    );
  }
  // activeBot
  if (localStorage.getItem("activeBot") === null) {
    localStorage.setItem(
      "activeBot",
      JSON.stringify({
        key: encrypt("app-qQppSgsAKdKQ2nw8NRE6xXAs"),
        type: "Agent"
      })
    );
  }
};

export const isApikeyHash = () => {
  const activeBot = localStorage.getItem("activeBot");
  const apiKey = localStorage.getItem("apiKey");

  if (!activeBot && !apiKey) {
    initialStart();
  }
  if (activeBot && apiKey) {
    const activeBot1 = JSON.parse(activeBot);
    const apiKey1 = JSON.parse(apiKey);

    if (activeBot1.key.startWith("app")) {
      initialStart();
    }
  }
};
