// import { useState } from "react";

// export const InputMessage = () => {
//     const [chatId, setChatId] = useState(id || "");
//     const [isTyping, setIsTyping] = useState<boolean>(false);
//     const [input, setInput] = useState<string>("");
//     const handleSubmit = async (e: React.FormEvent) => {
//         setIsTyping(true);
//         if (input === "") return;
//         e.preventDefault();
//         // Lấy tin nhắn người dùng
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "user",
//             content: input
//           }
//         ]);
//         setInput("");

//         try {
//           const result = await sendMessage(input, chatId, activeBot);
//           setChatId(result.conversation_id);
//           setMessages((prev) => [
//             ...prev,
//             {
//               role: "assistant",
//               content: result.answer
//             }
//           ]);
//           setIsTyping(false);
//         } catch (error) {
//           console.error(error);
//           throw new Error("Can not send messages");
//         }
//       };
//   return (
//     <div
//       className={cn(
//         "inset-x-0 z-50 mb-[30px] bottom-0 fixed transition-[margin-left] ease-in-out duration-300 rounded-full ",
//         sidebar?.isOpen ? "lg:ml-72 ml-0" : "lg:ml-24 ml-0"
//       )}
//     >
//       <div className="w-full  max-w-xl mx-auto  ">
//         <Card className="p-2  border-none rounded-full">
//           <form onSubmit={handleSubmit}>
//             <div className="flex">
//               <Input
//                 type="file"
//                 className="hidden"
//                 ref={fileRef}
//                 onChange={(e) => handleFileChange(e)}
//                 accept="image/*"
//               />
//               <Button
//                 className="bg-transparent hover:bg-transparent rounded-full shadow-none "
//                 onClick={(e) => {
//                   e.preventDefault();
//                   fileRef.current?.click();
//                 }}
//               >
//                 <Image
//                   src={"/image.svg"}
//                   alt="upimg"
//                   height={20}
//                   width={20}
//                   className="w-auto h-auto"
//                 />
//               </Button>
//               <Input
//                 type="text"
//                 value={input}
//                 onChange={(event) => {
//                   setInput(event.target.value);
//                 }}
//                 className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none focus:border-transparent focus-visible:ring-none mx-auto  shadow-none "
//                 placeholder="Hỏi tôi bất cứ điều gì?"
//               />
//               <Button
//                 // onClick={handleSubmit}
//                 disabled={!input.trim()}
//                 variant={"ghost"}
//                 ref={submutButtonRef}
//               >
//                 <Image src="/sent.svg" alt="send icon" height={30} width={30} />
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };
