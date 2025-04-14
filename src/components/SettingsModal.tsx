import React from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    darkMode: boolean;
    notifications: boolean;
    sound: boolean;
  };
  onUpdateSettings: (settings: {
    darkMode: boolean;
    notifications: boolean;
    sound: boolean;
  }) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-96 rounded-lg shadow-lg ${settings.darkMode ? 'bg-[#202c33]' : 'bg-white'}`}>
        <div className={`p-4 border-b ${settings.darkMode ? 'border-[#2a3942]' : 'border-gray-200'} flex justify-between items-center`}>
          <h2 className={`text-lg font-semibold ${settings.darkMode ? 'text-[#e9edef]' : 'text-gray-800'}`}>Settings</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              settings.darkMode
                ? 'text-[#8696a0] hover:text-[#e9edef] hover:bg-[#2a3942]'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className={`${settings.darkMode ? 'text-[#e9edef]' : 'text-gray-700'}`}>
                Dark Mode
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => onUpdateSettings({ ...settings, darkMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a884]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className={`${settings.darkMode ? 'text-[#e9edef]' : 'text-gray-700'}`}>
                Notifications
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => onUpdateSettings({ ...settings, notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a884]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className={`${settings.darkMode ? 'text-[#e9edef]' : 'text-gray-700'}`}>
                Sound
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sound}
                  onChange={(e) => onUpdateSettings({ ...settings, sound: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a884]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
