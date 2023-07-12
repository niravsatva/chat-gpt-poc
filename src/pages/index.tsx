import Head from "next/head";
import {
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@/styles/Chat.module.css";
import { useEffect, useRef, useState } from "react";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
// import { uploadFile } from "../../utils/fineTuneFunctions";

type Message = {
  content: string;
  sentTime: number;
  sender: string;
  direction: "incoming" | "outgoing";
};

const CHATGPT_USER = "ChatGPT";
const DEAFULT_BEHAVIOR = "General Conversation";
const CONFIGURATION = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const greetingsMsg =
  "Hello! Welcome to the Hyde Homes Assistant. How can I assist you today?";
const FirstMessage: Message = {
  content: greetingsMsg,
  sentTime: Math.floor(Date.now() / 1000),
  sender: CHATGPT_USER,
  direction: "incoming",
};
const OPENAI_CLIENT = new OpenAIApi(CONFIGURATION);
const INPUT_TEXT = `Once upon a time, in a bustling city, there was a talented young programmer named Alex. Alex had a burning passion for language and artificial intelligence. They dreamed of creating a powerful language model that could understand and generate human-like text.

After months of hard work and research, Alex stumbled upon OpenAI's groundbreaking GPT (Generative Pre-trained Transformer) model. Excitement filled their heart as they realized the potential of this remarkable technology.

However, there was one challenge Alex had to overcome: understanding how to create embeddings for the OpenAI model. Embeddings were crucial in representing text data in a numerical format that the model could process. These embeddings captured the semantic meaning and relationships between words, enabling the model to generate coherent and contextually relevant responses.

Undeterred, Alex embarked on a journey to unravel the mysteries of embeddings. They delved into the depths of natural language processing, studying techniques like word2vec and GloVe. They grasped the concept of representing words as dense vectors in a high-dimensional space, where similar words were closer together.

Equipped with newfound knowledge, Alex set out to integrate embedding creation into their OpenAI model. They developed a pipeline that leveraged pre-trained embedding models to convert words and sentences into their numerical representations. These embeddings would then serve as input to the OpenAI model, enhancing its ability to understand and generate text.

With each passing day, Alex's model grew stronger. They fine-tuned the embeddings, experimented with different architectures, and optimized the training process. Gradually, the model started exhibiting remarkable language understanding and generation capabilities.

Word spread about Alex's groundbreaking work, and soon researchers and developers flocked to witness the power of their creation. Together, they pushed the boundaries of language understanding and set the stage for transformative applications in various fields.

Alex's journey to create embeddings for the OpenAI model was not just about building a powerful language model. It was a testament to the human spirit of curiosity, innovation, and perseverance. Through their efforts, Alex contributed to the advancement of artificial intelligence and brought us one step closer to machines that truly understand and communicate with us.

And so, the story of Alex, the embedding creator, became a legend in the world of AI, inspiring future generations to explore the depths of language and forge new paths in the realm of intelligent machines.`;


export default function Chat({ modelName }: { modelName: string }) {
  const messageInput = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([FirstMessage]);
  const [behaviorInput, setBehaviorInput] = useState(DEAFULT_BEHAVIOR);
  const [behavior, setBehavior] = useState(DEAFULT_BEHAVIOR);

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    if (!waitingForResponse) {
      messageInput.current?.focus();
    }
  }, [waitingForResponse]);

  // useEffect(()=>{uploadFineTuneFile()})

  const sendMessage = async (
    innerHtml: string,
    textContent: string,
    innerText: string,
    nodes: NodeList
  ) => {
    const newMessageList = [...messages];
    const newMessage: Message = {
      content: textContent,
      sentTime: Math.floor(Date.now() / 1000),
      sender: "You",
      direction: "outgoing",
    };
    newMessageList.push(newMessage);
    setMessages([...newMessageList]);

    setWaitingForResponse(true);
    const response = await getResponse(newMessageList);

    const newMessageResponse: Message = {
      content: response.content as string,
      sentTime: Math.floor(Date.now() / 1000),
      sender: CHATGPT_USER,
      direction: "incoming",
    };

    newMessageList.push(newMessageResponse);
    setMessages([...newMessageList]);
    setWaitingForResponse(false);
  };

  const getResponse = async (newMessageList: Message[]) => {
    const systemMessage = {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: behavior,
    };

    const input = newMessageList.map((message) => {
      return {
        role:
          message.sender === CHATGPT_USER
            ? ChatCompletionRequestMessageRoleEnum.Assistant
            : ChatCompletionRequestMessageRoleEnum.User,
        content: message.content,
      };
    });
    console.log({
      model: modelName,
      messages: [systemMessage, ...input],
    });
    let saprationStr = "->";
    const inputMsg: any =
      // "You are chatbot who gives answer related to hyde homes and if user is not asking question related to hyde homes then reply with Sorry i do not know" +
      // " " +
      input[input.length - 1].content + (saprationStr ? saprationStr : "");

    const response = await OPENAI_CLIENT.createCompletion({
      model: modelName ? modelName : "text-davinci-003",
      // model: 'gpt-3.5-turbo',
      prompt: inputMsg,
      max_tokens: 100,

      // temperature: 1,
      // top_p:1,
      // n: 1,
      // echo:false,
      stop: ["END", "\n",'->'],
      // messages: [systemMessage, ...input],
    });
    const formetedResponse = response.data.choices[0].text?.split("\n")[0];
    const content = response.data.choices[0].text;
    return {
      content: content,
      // content: formetedResponse,
    };
  };

  const updateBehavior = () => {
    const finalBehavior = behaviorInput.trim().length
      ? behaviorInput.trim()
      : DEAFULT_BEHAVIOR;
    setBehavior(finalBehavior);
  };

  // 1 CREATE DATA SOURCE FILE FOR TRAINNING MODAL
  // 2 CHOOS WHAT MODAL TO BE TRAIN 
  // 3 UPLOAD DATA SOURCE FILE
  // 4 STORE UPLOADED FILE ID FROME RESPOCE.
  // 5 CREATE FINE TUNE
  // 6 WAIT FOR FINETUNE SUCCESS STATUS
  // 7 IF FINE TUNE SUCCESSED THEN GET FINE TUNED MODEL NAME
  // 8 USING FINE TUNED MODEL NAME TO START CHAT

  return (
    <>
      <Head>
        <title>Hyde Homes AI Chatbot</title>
        <meta name="description" content="Hyde Homes AI Chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className={styles.container}>
        <div className={styles.chatWrapper}>
          <div className={styles.chatContainer}>
            <MainContainer>
              <ChatContainer>
                {/* <div as="ConversationHeader"> */}
                <ConversationHeader className={styles.main_header}>
                <ConversationHeader.Content userName={<h1 className={styles.main_header}> Hyde Homes AI Chatbot</h1>}/>
                  
                </ConversationHeader>
                {/* </div> */}
                <MessageList
                  className={styles.chatMessageList}
                  typingIndicator={
                    waitingForResponse && (
                      <TypingIndicator
                        content="AI is thinking"
                        style={{ background: "#272727" }}
                      />
                    )
                  }
                >
                  {messages.map((message) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Message
                        model={{
                          message: message.content,
                          sentTime: `${message.sentTime}`,
                          sender: `${message.sender}`,
                          direction: message.direction,
                          position: "normal",
                          type: "text",
                        }}
                      />
                    );
                  })}
                </MessageList>
                <MessageInput
                  placeholder="Type message here"
                  style={{
                    background: "#272727",
                  }}
                  onSend={sendMessage}
                  autoFocus={true}
                  attachButton={false}
                  disabled={waitingForResponse}
                  ref={messageInput}

                />
                
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let modelName;
  const fs = require("fs");

  // FOR GET FINE TUNE MODEL BY ID
  const retriveFineTuneById = async (modelId: string) => {
    const modelNameRes = await OPENAI_CLIENT.retrieveFineTune(modelId);
    console.log("retriveFineTune=======>", modelNameRes.data);
  };

  // FOR GET MODEL BY MODEL ID
  const retriveModelById = async (modelId: string) => {
    try {
      const modelNameRes = await OPENAI_CLIENT.retrieveModel(modelId);
      console.log("retrieveModel=======>", modelNameRes.data);
    } catch (error:any) {
      console.log("ERROR retrieveModel=======>", error?.response);
    }
  };

  // FOR THE CREATE FINE TUNE PROCESS
  const makeFineTune = async (fileId: string, modelName: string) => {
    try {
      const fineTuneRes = await OPENAI_CLIENT.createFineTune({
        training_file: fileId,
        model: modelName,
        // batch_size:10,
        // learning_rate_multiplier:0.2,
        // prompt_loss_weight:1,
        // n_epochs:6,
      });
      console.log("makeFineTune===========>", fineTuneRes.data);
      return fineTuneRes;
    } catch (err: any) {
      console.log(
        "ERROR in makeFineTune===========> ",
        err.response.data.error
      );
    }
  };

  // FOR EMBEDDING PROCESS
  const makeEmbedding = async (inputText: string, modelName: string) => {
    try {
      const embeddingRes = await OPENAI_CLIENT.createEmbedding({
        input: inputText,
        model: modelName,
        // batch_size:256,
        // learning_rate_multiplier:0.2,
        // prompt_loss_weight:1,
        // n_epochs:10,
      });
      console.info("makeEmbedding===========>", embeddingRes.data);
      return embeddingRes;
    } catch (err: any) {
      console.log(
        "ERROR in makeEmbedding===========> ",
        err.response.data.error
      );
    }
  };

  // FOR GET LIST AND SET FINE TUNED MODEL NAME
  const getFineTunedModelNameFromList = async () => {
    try {
      const modelListRes: any = await OPENAI_CLIENT.listModels();
      const modelNameRes = await OPENAI_CLIENT.listFineTunes();
      console.table(modelListRes.data.data, ["id", "owned_by"]);
      console.table(modelNameRes.data.data, [
        "id",
        "status",
        "fine_tuned_model",
        "root",
      ]);

      // const list = await OPENAI_CLIENT.listModels();
      // console.log('333333333333333333333 List=======>', list.data);
      modelName =
        modelNameRes.data.data[modelNameRes.data.data.length - 1]
          ?.fine_tuned_model;
    } catch (err) {
      console.log("ERROR in getFineTunedModelName===========>  ", err);
    }
  };

  // UPLOAD DATA SOURCE FILE FOR FINE TUNE PROCESS
  const uploadFileAndFineTune = async (baseModelName: string) => {
    try {
      const f = await OPENAI_CLIENT.createFile(
        fs.createReadStream("src/pages/dataSource.jsonl"),
        "fine-tune"
      );
      // const fileContent = await OPENAI_CLIENT.cancelFineTune("ft-T5yFB1kPCzzIgN3S5W6JO2pD")
      // console.log(`1111111111111111111 File ID ${f.data.id}-----------> File Data ${JSON.stringify(f.data)}`);
      // console.log(`1111111111111111111 File ID ${f.data.id}-----------> File Data ${fileContent}`);
      // console.info(fileContent,'fileContent')

      if (f.data.id) {
        await makeFineTune(f.data.id, baseModelName);
        // console.log(finTuneRes,'finTuneResfinTuneRes');
      }
      return f.data.id;
    } catch (err:any) {
      console.log("err uploadfile: ", err?.response?.data);
    }
  };

  // FOR DELETE FINE TUNED MODEL BY MODEL NAME
  const deletFineTunedModelByName = async (modelName: string | null) => {
    try {
      if (modelName) {
        const deletRes = await OPENAI_CLIENT.deleteModel(modelName);
        console.log("deleteModel=======>", deletRes.data);
      }
    } catch (error: any) {
      console.log("ERROR Delete finetune model========>", error?.response);
    }
  };

  // FOR CANCEL FINE TUNED MODEL BY MODEL NAME
  const cancelFineTunedModelId = async (finetuneId: string) => {
    try {
      if (finetuneId) {
        const deletRes = await OPENAI_CLIENT.cancelFineTune(finetuneId);
        console.log("CancelModel=======>", deletRes.data);
      }
    } catch (error: any) {
      console.log("ERROR Cancel finetune model========>", error?.response);
    }
  };
  // fs.readFile("src/pages/test.jsonl", "utf8", (error, data) => {
  //   if (error) {
  //     console.error("An error occurred while reading the file:", error);
  //     return;
  //   }

  //   // File content is available in the 'data' variable
  //   console.log("File content:", `${data}`);
  // });

  // await deletFineTunedModelByName('davinci:ft-personal-2023-06-20-06-37-13');
  // await getFineTunedModelNameFromList();
  // await uploadFileAndFineTune('davinci')
  // await retriveFineTuneById("ft-S0kKW8JUI7KiefVMU8qmnjUa");
  // await retriveModelById('ft-Fxk9pWrHodFuwPH57F3euiyc');
  // await cancelFineTunedModelId('ft-cwLxxvPlrh5og2LhhHYiCtFD');
  // await makeEmbedding(INPUT_TEXT,'text-embedding-ada-002');

  return {
    props: {
      // modelName: "davinci:ft-satva-solutions-2023-07-05-12-00-23",
      modelName: "davinci:ft-satva-solutions-2023-07-12-10-02-43",
    },
  };
}
