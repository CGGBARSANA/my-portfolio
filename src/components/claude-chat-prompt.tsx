"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: input },
        ];

        setMessages(newMessages);
        setInput("");
        setLoading(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: newMessages }),
        });

        const data = await res.json();

        const reply = data?.choices?.[0]?.message?.content;

        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: reply },
        ]);

        setLoading(false);
    };

    return (
        <>
            <Card className="w-full h-full flex flex-col px-4">

  {!loading && messages.length === 0 && (
    <div className="flex-1 flex items-center justify-center">
      <CardTitle className="text-center">
        Ask me anything!
      </CardTitle>
    </div>
  )}
                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-muted text-white ml-auto w-fit"
                                        : "bg-muted w-fit"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-sm text-muted-foreground">
                                Thinking...
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="flex gap-2">
                    <Input
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