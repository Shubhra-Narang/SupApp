import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import ChatComponent from './components/Chat.tsx';
import NewGroupModal from './components/NewGroupModal.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import Login from './Login.tsx';

interface Message {
  id: string;
  content: string;
  sent: boolean;
  time: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  isStarred?: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline?: boolean;
  isGroup?: boolean;
  members?: string[];
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    sound: true
  });
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      { id: '1', content: "Hey Sarah, how's the project going?", sent: false, time: "10:00 AM", status: 'read' },
      { id: '2', content: "It's going well! Just finished the presentation.", sent: true, time: "10:15 AM", status: 'read' },
      { id: '3', content: "That's great! Can't wait to see it tomorrow.", sent: false, time: "10:20 AM", status: 'read' },
      { id: '4', content: "See you tomorrow!", sent: true, time: "10:30 AM", status: 'read' },
    ],
    '2': [
      { id: '1', content: "Hi John, any updates on the client meeting?", sent: false, time: "9:00 AM", status: 'read' },
      { id: '2', content: "Yes, they loved our proposal!", sent: true, time: "9:15 AM", status: 'read' },
      { id: '3', content: "That's fantastic news!", sent: false, time: "9:20 AM", status: 'read' },
      { id: '4', content: "We should celebrate this win!", sent: true, time: "9:25 AM", status: 'read' },
    ],
    '3': [
      { id: '1', content: "Team, don't forget about the 3 PM meeting", sent: false, time: "2:30 PM", status: 'read' },
      { id: '2', content: "I'll be there!", sent: true, time: "2:35 PM", status: 'read' },
      { id: '3', content: "Got it, see you then", sent: true, time: "2:36 PM", status: 'read' },
      { id: '4', content: "I'll join remotely", sent: true, time: "2:37 PM", status: 'read' },
    ]
  });
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: "Sarah Wilson",
      lastMessage: "See you tomorrow!",
      time: "10:30 AM",
      unread: 2,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      isOnline: true
    },
    {
      id: '2',
      name: "John Smith",
      lastMessage: "We should celebrate this win!",
      time: "9:25 AM",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      isOnline: false
    },
    {
      id: '3',
      name: "Tech Team",
      lastMessage: "I'll join remotely",
      time: "2:37 PM",
      unread: 5,
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
      isGroup: true,
      members: ["Sarah Wilson", "John Smith", "Mike Johnson", "Emily Davis"]
    },
    {
      id: '4',
      name: "Mike Johnson",
      lastMessage: "Can you review the PR?",
      time: "11:45 AM",
      unread: 1,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      isOnline: true
    },
    {
      id: '5',
      name: "Emily Davis",
      lastMessage: "Thanks for the help!",
      time: "Yesterday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      isOnline: false
    },
    {
      id: '6',
      name: "Project Managers",
      lastMessage: "Meeting at 3 PM",
      time: "Yesterday",
      unread: 3,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
      isGroup: true,
      members: ["Sarah Wilson", "Mike Johnson", "David Brown", "Lisa Chen"]
    },
    {
      id: '7',
      name: "David Brown",
      lastMessage: "The design looks great!",
      time: "Yesterday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      isOnline: true
    },
    {
      id: '8',
      name: "Lisa Chen",
      lastMessage: "I'll send the files",
      time: "Yesterday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      isOnline: false
    },
    {
      id: '9',
      name: "Marketing Team",
      lastMessage: "Campaign launch tomorrow",
      time: "2 days ago",
      unread: 7,
      avatar: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=100&h=100&fit=crop",
      isGroup: true,
      members: ["Emily Davis", "Lisa Chen", "Alex Turner", "Rachel Green"]
    },
    {
      id: '10',
      name: "Alex Turner",
      lastMessage: "Let's catch up soon",
      time: "2 days ago",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      isOnline: false
    }
  ]);

  const handleSendMessage = (message: string) => {
    if (selectedChat) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg: Message = {
        id: String(Date.now()),
        content: message,
        sent: true,
        time: currentTime,
        status: 'sending'
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg]
      }));

      setChats(chats.map(chat =>
        chat.id === selectedChat
          ? { ...chat, lastMessage: message, time: currentTime }
          : chat
      ));

      // Simulate message delivery and read status
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedChat]: prev[selectedChat].map(msg =>
            msg.id === newMsg.id
              ? { ...msg, status: 'delivered' }
              : msg
          )
        }));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedChat]: prev[selectedChat].map(msg =>
            msg.id === newMsg.id
              ? { ...msg, status: 'read' }
              : msg
          )
        }));
      }, 2000);
    }
  };

  const handleFileUpload = (file: File) => {
    if (selectedChat) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg: Message = {
        id: String(Date.now()),
        content: `File: ${file.name}`,
        sent: true,
        time: currentTime,
        type: 'file',
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        status: 'read'
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg]
      }));
      setChats(chats.map(chat =>
        chat.id === selectedChat
          ? { ...chat, lastMessage: `File: ${file.name}`, time: currentTime }
          : chat
      ));
    }
  };

  const handleImageUpload = (file: File) => {
    if (selectedChat) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg: Message = {
        id: String(Date.now()),
        content: 'Image',
        sent: true,
        time: currentTime,
        type: 'image',
        fileUrl: URL.createObjectURL(file),
        status: 'read'
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg]
      }));
      setChats(chats.map(chat =>
        chat.id === selectedChat
          ? { ...chat, lastMessage: 'Image', time: currentTime }
          : chat
      ));
    }
  };

  const handleNewGroup = () => {
    setShowNewGroupModal(true);
  };

  const handleCreateGroup = (name: string, memberIds: string[]) => {
    const newGroupId = String(Date.now());
    const selectedMembers = chats
      .filter(chat => memberIds.includes(chat.id))
      .map(chat => chat.name);

    const newGroup: Chat = {
      id: newGroupId,
      name: name,
      lastMessage: 'Group created',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      isGroup: true,
      members: selectedMembers
    };

    setChats(prev => [newGroup, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newGroupId]: []
    }));
    setSelectedChat(newGroupId);
    setShowNewGroupModal(false);
  };

  const handleSettings = () => {
    setShowSettingsModal(true);
  };

  const handleUpdateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const availableUsers = chats
    .filter(chat => !chat.isGroup)
    .map(chat => ({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar
    }));

  return (
    <div className={`flex h-screen ${settings.darkMode ? 'dark bg-[#111b21]' : 'bg-gray-100'}`}>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          {showNewGroupModal && (
            <NewGroupModal
              isOpen={showNewGroupModal}
              onClose={() => setShowNewGroupModal(false)}
              onCreateGroup={handleCreateGroup}
              availableUsers={availableUsers}
              darkMode={settings.darkMode}
            />
          )}
          {showSettingsModal && (
            <SettingsModal
              isOpen={showSettingsModal}
              onClose={() => setShowSettingsModal(false)}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
          <Sidebar
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
            onNewGroup={handleNewGroup}
            onSettings={handleSettings}
            onLogout={handleLogout}
            darkMode={settings.darkMode}
          />
          <div className="w-2/3 flex flex-col">
            {selectedChat ? (
              <ChatComponent
                selectedChat={chats.find(c => c.id === selectedChat) || null}
                messages={messages}
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
                onImageUpload={handleImageUpload}
                darkMode={settings.darkMode}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className={`text-lg ${settings.darkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;