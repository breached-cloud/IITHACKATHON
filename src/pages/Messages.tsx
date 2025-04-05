
import React, { useState } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    senderId: "f1",
    senderName: "Dr. Smith",
    senderRole: "faculty",
    recipientId: "s1",
    content: "How is your assignment coming along? Let me know if you need help.",
    timestamp: new Date(2023, 3, 15, 10, 30),
    read: true
  },
  {
    id: "2",
    senderId: "s1",
    senderName: "John Student",
    senderRole: "student",
    recipientId: "f1",
    content: "I'm making good progress. I have a question about the third problem though.",
    timestamp: new Date(2023, 3, 15, 11, 45),
    read: true
  },
  {
    id: "3",
    senderId: "f1",
    senderName: "Dr. Smith",
    senderRole: "faculty",
    recipientId: "s1",
    content: "Feel free to explain your question in detail. I'm here to help!",
    timestamp: new Date(2023, 3, 15, 13, 15),
    read: false
  },
  {
    id: "4",
    senderId: "a1",
    senderName: "Admin User",
    senderRole: "admin",
    recipientId: "s1",
    content: "This is a system announcement: The platform will be under maintenance this weekend.",
    timestamp: new Date(2023, 3, 16, 9, 0),
    read: false
  }
];

// Mock contacts for the user
const mockContacts = [
  {
    id: "f1",
    name: "Dr. Smith",
    role: "faculty",
    avatar: "https://i.pravatar.cc/150?img=13",
    lastActive: "2 hours ago"
  },
  {
    id: "a1",
    name: "Admin User",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=14",
    lastActive: "1 day ago"
  },
  {
    id: "f2",
    name: "Prof. Johnson",
    role: "faculty",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastActive: "Just now"
  }
];

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [activeContact, setActiveContact] = useState(mockContacts[0]);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const { toast } = useToast();
  
  // Filter messages for the current conversation
  const conversationMessages = messages.filter(
    msg => (msg.senderId === user?.id && msg.recipientId === activeContact.id) || 
           (msg.senderId === activeContact.id && msg.recipientId === user?.id)
  );
  
  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: user?.id || "",
      senderName: user?.name || "",
      senderRole: user?.role || "student",
      recipientId: activeContact.id,
      content: messageText,
      timestamp: new Date(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully."
    });
  };

  return (
    <PageLayout title="Messages">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Contacts sidebar */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4">
                  {mockContacts.map(contact => (
                    <div 
                      key={contact.id}
                      onClick={() => setActiveContact(contact)}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                        activeContact.id === contact.id 
                          ? "bg-primary/10" 
                          : "hover:bg-secondary/50"
                      }`}
                    >
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.lastActive}</div>
                      </div>
                      {/* Show dot indicator for unread messages */}
                      {messages.some(m => m.senderId === contact.id && m.recipientId === user?.id && !m.read) && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat area */}
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                  <AvatarFallback>{activeContact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{activeContact.name}</CardTitle>
                  <div className="text-sm text-muted-foreground capitalize">{activeContact.role}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              {/* Messages area */}
              <ScrollArea className="flex-1 p-2">
                <div className="space-y-4">
                  {conversationMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    conversationMessages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.senderId === user?.id 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <div className={`text-xs mt-1 ${
                            msg.senderId === user?.id 
                              ? "text-primary-foreground/80" 
                              : "text-muted-foreground"
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="border-t p-3 flex gap-2">
                <Textarea 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Messages;
