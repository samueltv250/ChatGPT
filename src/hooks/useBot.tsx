import { useEffect, useRef, useState } from "react";
import useChat, { IData, ChatMessageType, useSettings } from "../store/store";
import { fetchResults } from "../services/chatService";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  index: number;
  chat: ChatMessageType;
}; 


export default function useBot({ index, chat }: Props) {
  const resultRef = useRef(chat.content);
  const sourcesRef = useRef(chat.sources);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState(chat.content);
  const [error, setError] = useState("");
  const [sources, setSources] = useState(chat.sources);
  const [isStreamCompleted, setIsStreamCompleted] = useState(false);
  const query = useChat((state) => state.chats[index - 1].content);
  const [chats, addChat] = useChat((state) => [state.chats, state.addChat]);
  const [sendHistory, selectedModal, systemMessage, useForAllChats] =
    useSettings((state) => [
      state.settings.sendChatHistory,
      state.settings.selectedModal,
      state.settings.systemMessage,
      state.settings.useSystemMessageForAllChats,
    ]);
  const chatsRef = useRef(chats);

  chatsRef.current = chats;

  const scrollToBottom = useDebouncedCallback(() => {
    if (!cursorRef.current) return;
    cursorRef.current.scrollIntoView(true);
  }, 50);

  useEffect(() => {
    function addMessage() {
      addChat(
        { role: "assistant", content: resultRef.current, id: chat.id , sources: sourcesRef.current},
        index
      );
      setIsStreamCompleted(true);
    }

    // function handleOnData(data: string) {
    //   resultRef.current += data;
    //   setResult((prev) => prev + data);
    //   scrollToBottom();
    // }

    function handleOnData(data: IData) {
      console.log(data.sources); // Add this line
      resultRef.current = data.answer;
      sourcesRef.current = data.sources;
      setResult(data.answer);
      setSources(data.sources);
      localStorage.setItem('tokens', JSON.stringify(data.tokens));
      scrollToBottom();
    }

    function handleOnError(error: Error | string) {
      let errorMessage = typeof error === "string" ? error : error.message;
      alert(errorMessage); // This will show the error message in an error window.
      setError(errorMessage);

      window.alert(`System failed: ${errorMessage || 'Unknown error'}`); // Show the error message or a default one




      resultRef.current = "Sorry, looks like I'm having a bad day.";
      setResult("Sorry, looks like I'm having a bad day.");
      addMessage();
    }
    

    function handleOnCompletion() {
      addMessage();
    }
    if (chat.content) return;
    let mounted = true;
    const controller = new AbortController();
    let signal = controller.signal;

    setResult("");
    resultRef.current = "";
    setIsStreamCompleted(false);
    setError("");
    (async () => {
      try {
        let prevChats = sendHistory
          ? chatsRef.current
              .slice(0, index)
              .map((chat) => ({ role: chat.role, content: chat.content , sources: chat.sources}))
          : [
              {
                role: chatsRef.current[index - 1].role,
                content: chatsRef.current[index - 1].content,
              },
            ];
        if (useForAllChats && systemMessage) {
          prevChats = [
            { role: "system", content: systemMessage},
            ...prevChats,
          ];
        }
        await fetchResults(
          prevChats.map((chat) => ({ ...chat, sources: [] })),
          chatsRef.current[0].id,
          selectedModal,
          signal,
          handleOnData,
          handleOnCompletion
        );
      } catch (error) {
        if (error instanceof Error || typeof error === "string") {
          if (mounted) handleOnError(error);
        }
      }
    })();
    return () => {
      controller.abort();
      mounted = false;
    };
  }, [
    query,
    addChat,
    index,
    scrollToBottom,
    chat.content,
    chat.id,
    sendHistory,
    selectedModal,
    systemMessage,
    useForAllChats,
  ]);

  return { query, result, error, isStreamCompleted, cursorRef, sources};
}
