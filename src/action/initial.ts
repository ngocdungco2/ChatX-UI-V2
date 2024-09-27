export const initialStart = () => {
  // apikey list
  if (localStorage.getItem("apiKey") === null) {
    localStorage.setItem(
      "apiKey",
      JSON.stringify([
        {
          name: "holder",
          key: "app-tCrGXCUNAnQF6oyaG4PNyLMd",
          type: "Chatbot"
        }
      ])
    );
  }
  // activeBot
  if (localStorage.getItem("activeBot") === null) {
    localStorage.setItem(
      "activeBot",
      JSON.stringify({ key: "app-tCrGXCUNAnQF6oyaG4PNyLMd", type: "Chatbot" })
    );
  }
};
