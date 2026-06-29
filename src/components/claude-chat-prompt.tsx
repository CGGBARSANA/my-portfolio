"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSlowedText } from "@/hooks/slowed-text";
import POST_FETCH_MESSAGE from "@/api/GeminiPrompt/POST";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function MessageBubble({ text, onUpdate,}: { text: string, onUpdate?: () => void; }) {
  const animated = useSlowedText(text);
    useEffect(() => {
    onUpdate?.();
  }, [animated, onUpdate]);
  return <div>{animated}</div>;
}

export default function Chat() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const text =
    "Hello, I am a Software Engineer, and you are welcome to ask me anything.";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const data = await POST_FETCH_MESSAGE(input);

    const assistantMessage =
      data.status !== "error"
        ? data?.AgentResponse
        : "My AI is a bit busy right now. Please try again in a few seconds.";

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: assistantMessage },
    ]);

    setLoading(false);
  };

  return (
    <>
      <Card className="w-full h-full flex flex-col px-4 overflow-hidden rounded-2xl">
        {!loading && messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <CardTitle className="text-center">{displayedText}</CardTitle>
          </div>
        )}
        <ScrollArea className="flex-1 min-h-0 pr-2">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-sm whitespace-pre-wrap break-words max-w-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-[var(--text-color-mode)] ml-auto w-fit"
                    : "bg-muted w-fit"
                }`}
              >
                <MessageBubble text={msg.content} onUpdate={scrollToBottom} />
              </div>
            ))}
            {loading && (
              <div className="text-sm text-muted-foreground">Thinking...</div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            className="border-(--border-input)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>
            Send
          </Button>
        </div>
      </Card>
    </>
  );
}
