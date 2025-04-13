import React, { useState } from 'react';
import { MessageSquare, MoreVertical, Search, Users, Settings, LogOut } from 'lucide-react';

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

interface SidebarProps {
  chats: Chat[];
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  onNewGroup: () => void;
  onSettings: () => void;
  onLogout: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  selectedChat,
  onSelectChat,
  onNewGroup,
  onSettings,
  onLogout,
  darkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-1/3 border-r ${darkMode ? 'bg-[#111b21] border-[#2a3942]' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className={`p-4 ${darkMode ? 'bg-[#202c33]' : 'bg-white'} flex justify-between items-center relative z-10`}>
        <div className="flex items-center space-x-3">
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className={`font-semibold ${darkMode ? 'text-[#e9edef]' : 'text-gray-800'}`}>SupApp</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`${darkMode ? 'text-[#8696a0] hover:text-[#e9edef] hover:bg-[#2a3942]' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'} p-2 rounded-full`}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {showMenu && (
            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${
              darkMode ? 'bg-[#233138] border-[#2a3942]' : 'bg-white border-gray-200'
            } z-20`}>
              <button
                onClick={() => {
                  onNewGroup();
                  setShowMenu(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center space-x-2 ${
                  darkMode ? 'text-[#e9edef] hover:bg-[#2a3942]' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>New Group</span>
              </button>
              <button
                onClick={() => {
                  onSettings();
                  setShowMenu(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center space-x-2 ${
                  darkMode ? 'text-[#e9edef] hover:bg-[#2a3942]' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setShowMenu(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center space-x-2 ${
                  darkMode ? 'text-[#e9edef] hover:bg-[#2a3942]' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className={`p-3 ${darkMode ? 'bg-[#202c33]' : 'bg-white'} relative z-0`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
              darkMode ? 'bg-[#2a3942] text-[#e9edef]' : 'bg-gray-100 text-gray-800'
            }`}
          />
          <Search className={`absolute left-3 top-2.5 w-5 h-5 ${
            darkMode ? 'text-[#8696a0]' : 'text-gray-400'
          }`} />
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-[calc(100vh-140px)]">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-150 ${
              darkMode
                ? selectedChat === chat.id
                  ? 'bg-[#2a3942]'
                  : 'hover:bg-[#202c33]'
                : selectedChat === chat.id
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
            }`}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h2 className={`font-semibold truncate ${darkMode ? 'text-[#e9edef]' : 'text-gray-800'}`}>
                  {chat.name}
                </h2>
                <span className={`text-sm ${darkMode ? 'text-[#8696a0]' : 'text-gray-500'} flex-shrink-0`}>
                  {chat.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-sm truncate max-w-[180px] ${darkMode ? 'text-[#8696a0]' : 'text-gray-600'}`}>
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="bg-[#00a884] text-white rounded-full px-2 py-0.5 text-xs flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 