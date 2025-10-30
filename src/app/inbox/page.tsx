"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Search, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  sender: "user" | "other";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("ammi-watts");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "jennifer-markus",
      name: "Jennifer Markus",
      avatar: "/jennifer-markus-avatar.jpg",
      lastMessage:
        "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
      timestamp: "Today | 05:30 PM",
      messages: [
        {
          id: "1",
          sender: "other",
          text: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
          time: "05:30 PM",
        },
        {
          id: "2",
          sender: "user",
          text: "Yes, I just completed them!",
          time: "05:35 PM",
        },
      ],
    },
    {
      id: "iva-ryan",
      name: "Iva Ryan",
      avatar: "/iva-ryan-avatar.jpg",
      lastMessage:
        "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
      timestamp: "Today | 05:30 PM",
      messages: [
        {
          id: "1",
          sender: "other",
          text: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
          time: "05:30 PM",
        },
      ],
    },
    {
      id: "jerry-helfer",
      name: "Jerry Helfer",
      avatar: "/jerry-helfer-avatar.jpg",
      lastMessage:
        "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
      timestamp: "Today | 05:30 PM",
      messages: [
        {
          id: "1",
          sender: "other",
          text: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
          time: "05:30 PM",
        },
      ],
    },
    {
      id: "david-elson",
      name: "David Elson",
      avatar: "/david-elson-avatar.jpg",
      lastMessage:
        "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
      timestamp: "Today | 05:30 PM",
      messages: [
        {
          id: "1",
          sender: "other",
          text: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
          time: "05:30 PM",
        },
      ],
    },
    {
      id: "mary-freund",
      name: "Mary Freund",
      avatar: "/mary-freund-avatar.jpg",
      lastMessage:
        "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
      timestamp: "Today | 05:30 PM",
      messages: [
        {
          id: "1",
          sender: "other",
          text: "Hey! Did you finish the Hi-Fi wireframes for flora app design?",
          time: "05:30 PM",
        },
      ],
    },
    {
      id: "ammi-watts",
      name: "Ammi Watts",
      avatar: "/ammi-watts-avatar.jpg",
      lastMessage: "I will check it and get back to you soon",
      timestamp: "Today | 06:32 PM",
      messages: [
        {
          id: "1",
          sender: "other",
          text: "Oh, hello! All perfectly.",
          time: "04:45 PM",
        },
        {
          id: "2",
          sender: "other",
          text: "I will check it and get back to you soon",
          time: "04:45 PM",
        },
        {
          id: "3",
          sender: "user",
          text: "Oh, hello! All perfectly.\nI will check it and get back to you soon",
          time: "04:45 PM",
        },
        {
          id: "4",
          sender: "other",
          text: "Oh, hello! All perfectly.",
          time: "04:45 PM",
        },
        {
          id: "5",
          sender: "other",
          text: "I will check it and get back to you soon",
          time: "04:45 PM",
        },
        {
          id: "6",
          sender: "user",
          text: "Oh, hello! All perfectly.\nI will check it and get back to you soon",
          time: "04:45 PM",
        },
      ],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversation
  );

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleSendMessage = () => {
    if (!selectedConversation || !message.trim()) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: Date.now().toString(),
                sender: "user",
                text: message,
                time: new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
            lastMessage: message,
            timestamp: "Now",
          };
        }
        return conv;
      })
    );
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex h-screen bg-background overflow-hidden'>
      {/* Sidebar - Hidden on mobile when conversation is selected */}
      {(!isMobile || !selectedConversation) && (
        <div className='bg-[#EFF6FF] w-full md:w-80 border-r border-border flex flex-col bg-sidebar'>
          {/* Header */}
          <div className='p-4 border-b border-border'>
            <h2 className='text-xl font-semibold text-[#000000] mb-4'>
              All Messages
            </h2>

            {/* Search Input */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 bg-[#F3F4F6] border-border text-foreground placeholder:text-muted-foreground'
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className='flex-1 overflow-y-auto'>
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full px-4 py-3 border-b border-border text-left transition-colors hover:bg-sidebar-accent ${
                  selectedConversation === conversation.id
                    ? "bg-sidebar-accent"
                    : "hover:bg-sidebar-accent/50"
                }`}
              >
                <div className='flex items-start gap-3'>
                  <Avatar className='h-10 w-10 flex-shrink-0'>
                    <AvatarImage src={"/user.png"} alt={conversation.name} />
                    <AvatarFallback>
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 space-y-2 min-w-0'>
                    <div className='flex items-center justify-between gap-2'>
                      <h3 className='font-semibold text-[#030712] truncate'>
                        {conversation.name}
                      </h3>
                    </div>
                    <p className='text-sm text-[#4B5563] truncate'>
                      {conversation.lastMessage}
                    </p>
                    <p className='text-xs text-[#9CA3AF] flex-shrink-0'>
                      {conversation.timestamp}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area - Full width on mobile, flex-1 on desktop */}
      {selectedConversation && currentConversation && (
        <div className='flex-1 flex flex-col bg-white'>
          {/* Chat Header */}
          <div className='flex items-center justify-between p-4 border-b border-border bg-background'>
            <div className='flex items-center gap-3'>
              {isMobile && (
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className='w-5 h-5' />
                </Button>
              )}
              <Avatar className='h-10 w-10'>
                <AvatarImage src={"/user.png"} alt={currentConversation.name} />
                <AvatarFallback>
                  {currentConversation.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className='font-semibold text-foreground'>
                {currentConversation.name}
              </h2>
            </div>

            <Button variant='ghost' size='icon'>
              <Search className='w-5 h-5 text-foreground' />
            </Button>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {currentConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-[#030712] text-white rounded-br-none"
                      : "bg-[#EEF2FF] text-[#374151] rounded-bl-none"
                  }`}
                >
                  <p className='text-sm whitespace-pre-wrap break-words'>
                    {msg.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className='p-4 border-t border-border bg-[#F8F9FD]'>
            <div className='flex items-end gap-2'>
              <Input
                placeholder='Type your message here ...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className='flex-1 resize-none h-12 !bg-[#EEF2FF] border-border text-foreground placeholder:text-muted-foreground'
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size='icon'
                className='bg-primary hover:bg-primary/90 text-primary-foreground rounded-full'
              >
                <Send className='w-6 h-6' />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state on desktop */}
      {!selectedConversation && !isMobile && (
        <div className='flex-1 flex items-center justify-center bg-background'>
          <div className='text-center'>
            <p className='text-muted-foreground text-lg'>
              Select a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
