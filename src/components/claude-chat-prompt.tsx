"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSlowedText } from "@/hooks/slowed-text";

type Message = {
    role: "user" | "assistant";
    content: string;
};


function MessageBubble({ text }: { text: string }) {
    const animated = useSlowedText(text);

    return <div>{animated}</div>;
}


export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const text = "Hello, I am a Software Engineer, and you are welcome to ask me anything.";
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


    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: input },
        ];

        setMessages(newMessages);
        setInput("");
        setLoading(true);

        const res = await fetch("http://localhost:8080/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });
        let reply = ''
        const data = await res.json();
        console.log("api: ",data.status)
        if (data.status !== "error") {
            reply = data?.geminiResponse;
        } else{
            reply = "My AI is a bit busy right now. Please try again in a few seconds."
        }
        
        
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
                            {displayedText}
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
                                <MessageBubble text={msg.content} />
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