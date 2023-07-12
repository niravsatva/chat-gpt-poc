// import {
//   ChatContainer,
//   MainContainer,
//   Message,
//   MessageInput,
//   MessageList,
//   TypingIndicator,
// } from "@chatscope/chat-ui-kit-react";
// import styles from "@/styles/Chat.module.css";
// import { useEffect, useRef, useState } from "react";
// import { fineTuneData } from "./test";
// import {
//   ChatCompletionRequestMessageRoleEnum,
//   Configuration,
//   OpenAIApi,
// } from "openai";
// import { toast } from "react-toastify";
// // import brain from "brain.js";

// type Message = {
//   content: string;
//   sentTime: number;
//   sender: string;
//   direction: "incoming" | "outgoing";
// };

// const CHATGPT_USER = "ChatGPT";
// const DEAFULT_BEHAVIOR = "General Conversation";
// const CONFIGURATION = new Configuration({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });
// const OPENAI_CLIENT = new OpenAIApi(CONFIGURATION);

export default function Chat() {
  // let history: any = [];
  // const messageInput = useRef<HTMLDivElement>(null);
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [behaviorInput, setBehaviorInput] = useState(DEAFULT_BEHAVIOR);
  // const [behavior, setBehavior] = useState(DEAFULT_BEHAVIOR);
  // const [waitingForResponse, setWaitingForResponse] = useState(false);

  // const systemMessage: any = {
  //   role: ChatCompletionRequestMessageRoleEnum.System,
  //   content: `You are acting as A chatbot of “hyde homes`,
  // };

  // const sentMessageMiddlewear = (messageText: string): string => {
  //   const response = fineTuneData.filter((instruction) => {
  //     return instruction.prompt
  //       .toLowerCase()
  //       .includes(messageText?.trim().toLocaleLowerCase());
  //   });
  //   if (response?.length) {
  //     return response[0].completion;
  //   }
  //   console.log(response, "responseresponse");
  //   return "";
  // };

  
  //USING BRAIN JS
  //     const trainingData = [
  //         { input: 'Hi', output: 'Hello' },
  //         { input: 'What is your name?', output: 'My name is Chatbot' },
  //         { input: 'How are you?', output: 'I am doing well' },
  //         // Add more training examples here
  //       ];
  // const chatbot = new brain.recurrent.LSTM();

  // Provide user input

  // useEffect(()=>{
  // Create a new instance of the LSTM neural network

  // Train the chatbot using the training data
  // chatbot.train(trainingData);

  //  history = [systemMessage]

  //     fineTuneData.forEach((data) => {
  //         history.push({ role: 'user', content: data.prompt })
  //         history.push({ role: 'assistant', content: data.completion })
  //     })
  // },[])

  // useEffect(() => {
  //   if (!waitingForResponse) {
  //     messageInput.current?.focus();
  //   }
  // }, [waitingForResponse]);

  // const sendMessage = async (
  //   innerHtml: string,
  //   textContent: string,
  //   innerText: string,
  //   nodes: NodeList
  // ) => {
  //   if (textContent?.trim()) {
  //     const userInput = "Hi";
  //     const middlwearResponse = sentMessageMiddlewear(textContent);
  //     // Get the chatbot's response
  //     // const botResponse = chatbot.run(userInput);

  //     // console.log(botResponse,'botResponsebotResponsebotResponsebotResponsebotResponse'); // Output the bot's response
  //     const newMessageList = [...messages];
  //     const newMessage: Message = {
  //       content: textContent,
  //       sentTime: Math.floor(Date.now() / 1000),
  //       sender: "You",
  //       direction: "outgoing",
  //     };
  //     newMessageList.push(newMessage);
  //     setMessages([...newMessageList]);

  //     setWaitingForResponse(true);
  //     let content;
  //     if (middlwearResponse) {
  //       content = middlwearResponse;
  //     } else {
  //       content = await getResponse(newMessageList)
  //       content = content?.content
  //     }

  //     console.log(content, "contentcontentcontent");

  //     // history = [systemMessage]
  //     if (content) {
  //       const newMessageResponse: Message = {
  //         content: content,
  //         sentTime: Math.floor(Date.now() / 1000),
  //         sender: CHATGPT_USER,
  //         direction: "incoming",
  //       };

  //       newMessageList.push(newMessageResponse);
  //       setMessages([...newMessageList]);
  //     }
  //     setWaitingForResponse(false);
  //   }
  // };

  // const getResponse = async (newMessageList: Message[]) => {
  //   // fineTuneData.forEach((data) => {
  //   // if(history[0]?.roal!=='system'){
  //   // history.push({ role: 'user', content: data.prompt })
  //   // history.push({ role: 'assistant', content: data.completion })}
  //   // }
  //   // )

  //   console.log(history, "history");

  //   const input = newMessageList.map((message) => {
  //     return {
  //       role:
  //         message.sender === CHATGPT_USER
  //           ? ChatCompletionRequestMessageRoleEnum.Assistant
  //           : ChatCompletionRequestMessageRoleEnum.User,
  //       content: message.content,
  //     };
  //   });
  //   console.log({
  //     model: "gpt-3.5-turbo",
  //     messages: [systemMessage, ...input],
  //   });
  //   try {
  //     const response = await OPENAI_CLIENT.createChatCompletion({
  //       model: "gpt-3.5-turbo-16k",
  //       messages: [...history, ...input],
  //     });
  //     console.log(response);
  //     return {
  //       content: response.data.choices[0].message?.content,
  //     };
  //   } catch (error) {
  //     toast.error(error?.response.data.error.message ?? "Something want wrong");
  //     console.log(error?.response.data.error.message, "error");
  //   }

  //   await new Promise((f) => setTimeout(f, 1000));
  //   return {
  //     content: `${Math.random()}`,
  //   };
  // };

  // const updateBehavior = () => {
  //   const finalBehavior = behaviorInput.trim().length
  //     ? behaviorInput.trim()
  //     : DEAFULT_BEHAVIOR;
  //   setBehavior(finalBehavior);
  // };

  return (
    <></>
    // <div className={styles.container}>
    //   <div className={styles.inputContainer}>
    //     <input
    //       className={styles.input}
    //       value={behaviorInput}
    //       onChange={(e) => setBehaviorInput(e.target.value)}
    //     />
    //     <button className={styles.submit} onClick={updateBehavior}>
    //       Update Behavior
    //     </button>
    //   </div>
    //   <div className={styles.chatWrapper}>
    //     <div className={styles.chatContainer}>
    //       <MainContainer>
    //         <ChatContainer>
    //           <MessageList
    //             className={styles.chatMessageList}
    //             typingIndicator={
    //               waitingForResponse && (
    //                 <TypingIndicator
    //                   content="ChatGPT is thinking"
    //                   style={{ background: "#432A74" }}
    //                 />
    //               )
    //             }
    //           >
    //             {messages.map((message) => {
    //               return (
    //                 <Message
    //                   model={{
    //                     message: message.content,
    //                     sentTime: `${message.sentTime}`,
    //                     sender: message.sender,
    //                     direction: message.direction,
    //                     position: "normal",
    //                     type: "text",
    //                   }}
    //                 />
    //               );
    //             })}
    //           </MessageList>
    //           <MessageInput
    //             placeholder="Type message here"
    //             style={{ background: "#432A74" }}
    //             onSend={sendMessage}
    //             autoFocus={true}
    //             attachButton={false}
    //             disabled={waitingForResponse}
    //             ref={messageInput}
    //           />
    //         </ChatContainer>
    //       </MainContainer>
    //     </div>
    //   </div>
    // </div>
  );
}
