export const initialStart = () => {
  // apikey list
  if (localStorage.getItem("apiKey") === null) {
    localStorage.setItem(
      "apiKey",
      JSON.stringify([
        {
          name: "Web support",
          key: "app-qQppSgsAKdKQ2nw8NRE6xXAs",
          type: "Agent"
        }
      ])
    );
  }
  // activeBot
  if (localStorage.getItem("activeBot") === null) {
    localStorage.setItem(
      "activeBot",
      JSON.stringify({ key: "app-qQppSgsAKdKQ2nw8NRE6xXAs", type: "Agent" })
    );
  }
};
