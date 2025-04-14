import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import { MessageSquare, MoreVertical, Phone, Search, Send, Video, Paperclip, Image, Smile, Check, CheckCheck, Copy, Star, Trash2, Edit2, ChevronDown, User, Bell, Link, File } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

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

interface ChatProps {
  selectedChat: Chat | null;
  messages: Record<string, Message[]>;
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
  onImageUpload: (file: File) => void;
  darkMode: boolean;
}

const Chat: React.FC<ChatProps> = ({
  selectedChat,
  messages,
  onSendMessage,
  onFileUpload,
  onImageUpload,
  darkMode
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // @ts-ignore
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [disappearingMessages, setDisappearingMessages] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'media' | 'links' | 'docs'>('media');

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleMessageAction = (action: string, message: Message) => {
    setSelectedMessage(message);
    // Implement message actions here
    console.log(action, message);
    setShowMenu(false);
  };

  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    switch (action) {
      case 'contact':
        setShowContactInfo(true);
        break;
      case 'media':
        setShowMedia(true);
        setMediaType('media');
        break;
      case 'search':
        setShowSearch(true);
        setSearchQuery('');
        break;
      case 'mute':
        setIsMuted(!isMuted);
        // Show notification for mute status change
        alert(`Notifications ${!isMuted ? 'muted' : 'unmuted'} for ${selectedChat?.name}`);
        break;
      case 'disappearing':
        setDisappearingMessages(!disappearingMessages);
        // Show notification for disappearing messages status
        alert(`Disappearing messages ${!disappearingMessages ? 'enabled' : 'disabled'} for ${selectedChat?.name}`);
        break;
      case 'wallpaper':
        setShowWallpaper(true);
        break;
      case 'more':
        setShowMore(true);
        break;
    }
  };

  const handleMediaTypeChange = (type: 'media' | 'links' | 'docs') => {
    setMediaType(type);
  };

  const handleWallpaperSelect = (index: number) => {
    setSelectedWallpaper(`wallpaper-${index}`);
    // Show notification for wallpaper change
    alert(`Wallpaper changed for ${selectedChat?.name}`);
    setShowWallpaper(false);
  };

  const handleMoreAction = (action: string) => {
    switch (action) {
      case 'export':
        alert(`Exporting chat with ${selectedChat?.name}...`);
        break;
      case 'clear':
        if (confirm(`Are you sure you want to clear chat with ${selectedChat?.name}?`)) {
          alert('Chat cleared');
        }
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete chat with ${selectedChat?.name}?`)) {
          alert('Chat deleted');
        }
        break;
      case 'report':
        alert(`Reporting chat with ${selectedChat?.name}...`);
        break;
    }
    setShowMore(false);
  };

  const filteredMessages = searchQuery
    ? messages[selectedChat?.id || '']?.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages[selectedChat?.id || ''];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className={`p-4 ${darkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white'} border-b flex justify-between items-center relative`}>
        <div className="flex items-center space-x-4">
          <img
            src={selectedChat?.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full hover:ring-2 hover:ring-[#00a884] transition-all duration-200"
          />
          <div>
            <h2 className="font-semibold">{selectedChat?.name}</h2>
            <p className="text-sm opacity-75">
              {selectedChat?.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
            <Video className="w-5 h-5" />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className={`fixed right-0 top-0 mt-16 w-48 rounded-md shadow-lg z-[9999] ${darkMode ? 'bg-[#202c33]' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                <div className="py-1">
                  <button 
                    onClick={() => handleMenuAction('contact')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    View contact
                  </button>
                  <button 
                    onClick={() => handleMenuAction('media')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    Media, links, and docs
                  </button>
                  <button 
                    onClick={() => handleMenuAction('search')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    Search
                  </button>
                  <button 
                    onClick={() => handleMenuAction('mute')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    {isMuted ? 'Unmute notifications' : 'Mute notifications'}
                  </button>
                  <button 
                    onClick={() => handleMenuAction('disappearing')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    {disappearingMessages ? 'Disable disappearing messages' : 'Disappearing messages'}
                  </button>
                  <button 
                    onClick={() => handleMenuAction('wallpaper')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    Wallpaper
                  </button>
                  <button 
                    onClick={() => handleMenuAction('more')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
                  >
                    More
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showContactInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#202c33]' : 'bg-white'} w-96`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <button onClick={() => setShowContactInfo(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="text-center">
              <img src={selectedChat?.avatar} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{selectedChat?.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedChat?.isOnline ? 'Online' : 'Offline'}</p>
              {selectedChat?.isGroup && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Group Members</h4>
                  <div className="space-y-2">
                    {selectedChat.members?.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <span>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button 
                className="w-full py-2 bg-[#00a884] text-white rounded-lg hover:bg-[#008069] transition-colors duration-200"
                onClick={() => {
                  setShowContactInfo(false);
                  // @ts-ignore
                  // Focus on message input
                  document.querySelector('input[type="text"]')?.focus();
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {showMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#202c33]' : 'bg-white'} w-96`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Media, Links, and Docs</h3>
              <button onClick={() => setShowMedia(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => handleMediaTypeChange('media')}
                className={`p-2 rounded-lg ${mediaType === 'media' ? 'bg-[#00a884]/10' : ''}`}
              >
                <Image className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleMediaTypeChange('links')}
                className={`p-2 rounded-lg ${mediaType === 'links' ? 'bg-[#00a884]/10' : ''}`}
              >
                <Link className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleMediaTypeChange('docs')}
                className={`p-2 rounded-lg ${mediaType === 'docs' ? 'bg-[#00a884]/10' : ''}`}
              >
                <File className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {filteredMessages
                ?.filter(msg => {
                  if (mediaType === 'media') return msg.type === 'image';
                  if (mediaType === 'docs') return msg.type === 'file';
                  return false; // Links would need additional type
                })
                .map((msg, index) => (
                  <div key={index} className="flex items-center space-x-4 p-2 hover:bg-[#00a884]/5 rounded-lg cursor-pointer">
                    {msg.type === 'image' && <Image className="w-6 h-6" />}
                    {msg.type === 'file' && <File className="w-6 h-6" />}
                    <span>{msg.fileName || 'Media'}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#202c33]' : 'bg-white'} w-96`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Search Messages</h3>
              <button onClick={() => setShowSearch(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#2a3942] focus:outline-none focus:ring-2 focus:ring-[#00a884]"
            />
            <div className="mt-4 space-y-4">
              {filteredMessages?.map((msg, index) => (
                <div key={index} className="p-2 hover:bg-[#00a884]/5 rounded-lg">
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showWallpaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#202c33]' : 'bg-white'} w-96`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chat Wallpaper</h3>
              <button onClick={() => setShowWallpaper(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  onClick={() => handleWallpaperSelect(i)}
                  className={`aspect-square rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer hover:ring-2 hover:ring-[#00a884] transition-all duration-200 ${
                    selectedWallpaper === `wallpaper-${i}` ? 'ring-2 ring-[#00a884]' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showMore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#202c33]' : 'bg-white'} w-96`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">More Options</h3>
              <button onClick={() => setShowMore(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => handleMoreAction('export')}
                className="w-full p-2 text-left hover:bg-[#00a884]/5 rounded-lg"
              >
                Export Chat
              </button>
              <button 
                onClick={() => handleMoreAction('clear')}
                className="w-full p-2 text-left hover:bg-[#00a884]/5 rounded-lg"
              >
                Clear Chat
              </button>
              <button 
                onClick={() => handleMoreAction('delete')}
                className="w-full p-2 text-left hover:bg-[#00a884]/5 rounded-lg"
              >
                Delete Chat
              </button>
              <button 
                onClick={() => handleMoreAction('report')}
                className="w-full p-2 text-left hover:bg-[#00a884]/5 rounded-lg"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-[#111b21]' : 'bg-gray-100'}`}>
        {selectedChat && messages[selectedChat.id]?.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className="relative group">
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sent
                    ? darkMode
                      ? 'bg-[#005c4b] text-[#e9edef]'
                      : 'bg-[#dcf8c6] text-gray-800'
                    : darkMode
                      ? 'bg-[#202c33] text-[#e9edef]'
                      : 'bg-white text-gray-800'
                } shadow-sm group-hover:shadow-md transition-all duration-200`}
              >
                {message.type === 'image' && message.fileUrl && (
                  <img src={message.fileUrl} alt="Uploaded" className="max-w-full h-auto rounded-lg mb-2 hover:opacity-90 transition-opacity duration-200" />
                )}
                {message.type === 'file' && message.fileUrl && (
                  <a
                    href={message.fileUrl}
                    download={message.fileName}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    {message.fileName}
                  </a>
                )}
                <p className="break-words">{message.content}</p>
                <div className="flex items-center justify-end mt-1 space-x-1">
                  <span className="text-xs opacity-70">{message.time}</span>
                  {message.sent && message.status && (
                    <div className="flex items-center">
                      {message.status === 'sending' && <Check className="w-3 h-3" />}
                      {message.status === 'sent' && <Check className="w-3 h-3" />}
                      {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                      {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  )}
                </div>
              </div>
              <div className={`absolute right-0 top-0 hidden group-hover:flex space-x-1 ${message.sent ? '-translate-x-2' : 'translate-x-2'}`}>
                <button onClick={() => handleMessageAction('star', message)} className="p-1 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
                  <Star className="w-4 h-4" />
                </button>
                <button onClick={() => handleMessageAction('copy', message)} className="p-1 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={() => handleMessageAction('edit', message)} className="p-1 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleMessageAction('delete', message)} className="p-1 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className={`p-4 ${darkMode ? 'bg-[#202c33]' : 'bg-white'} border-t`}>
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200"
          >
            <Smile className="w-6 h-6 text-gray-500" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-20 left-4 z-50">
              <EmojiPicker onEmojiClick={(emoji) => setNewMessage(prev => prev + emoji.emoji)} />
            </div>
          )}
          <label className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200 cursor-pointer">
            <Paperclip className="w-6 h-6 text-gray-500" />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <label className="p-2 rounded-full hover:bg-[#00a884]/10 dark:hover:bg-[#00a884]/20 transition-colors duration-200 cursor-pointer">
            <Image className="w-6 h-6 text-gray-500" />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 py-2 px-4 rounded-full bg-[#00a884]/5 dark:bg-[#00a884]/10 focus:outline-none focus:ring-2 focus:ring-[#00a884] transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-[#00a884] text-white hover:bg-[#008069] transition-colors duration-200"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 