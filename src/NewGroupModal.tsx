import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, members: string[]) => void;
  availableUsers: { id: string; name: string; avatar: string }[];
  darkMode: boolean;
}

const NewGroupModal: React.FC<NewGroupModalProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
  availableUsers,
  darkMode
}) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedMembers.length >= 2) {
      onCreateGroup(groupName.trim(), selectedMembers);
      setGroupName('');
      setSelectedMembers([]);
      onClose();
    }
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-96 rounded-lg shadow-lg ${darkMode ? 'bg-[#202c33]' : 'bg-white'}`}>
        <div className={`p-4 border-b ${darkMode ? 'border-[#2a3942]' : 'border-gray-200'} flex justify-between items-center`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-[#e9edef]' : 'text-gray-800'}`}>Create New Group</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              darkMode
                ? 'text-[#8696a0] hover:text-[#e9edef] hover:bg-[#2a3942]'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="groupName" className={`block mb-2 ${darkMode ? 'text-[#e9edef]' : 'text-gray-700'}`}>
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                darkMode ? 'bg-[#2a3942] text-[#e9edef] border-[#2a3942]' : 'bg-white border-gray-300 text-gray-800'
              }`}
              placeholder="Enter group name"
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block mb-2 ${darkMode ? 'text-[#e9edef]' : 'text-gray-700'}`}>
              Select Members (at least 2)
            </label>
            <div className="max-h-48 overflow-y-auto">
              {availableUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => toggleMember(user.id)}
                  className={`flex items-center p-2 cursor-pointer rounded-lg mb-1 ${
                    darkMode
                      ? selectedMembers.includes(user.id)
                        ? 'bg-[#2a3942]'
                        : 'hover:bg-[#2a3942]'
                      : selectedMembers.includes(user.id)
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(user.id)}
                    onChange={() => {}}
                    className="mr-3"
                  />
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <span className={darkMode ? 'text-[#e9edef]' : 'text-gray-800'}>
                    {user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`mr-2 px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-[#2a3942] text-[#e9edef] hover:bg-[#374248]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!groupName.trim() || selectedMembers.length < 2}
              className={`px-4 py-2 rounded-lg bg-[#00a884] text-white ${
                (!groupName.trim() || selectedMembers.length < 2)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#008f6f]'
              }`}
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewGroupModal;
