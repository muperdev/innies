"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import DashboardLayout from "@/components/dashboard-layout";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Lock,
  Save,
  Trash2
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("account");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    bookingUpdates: true,
    paymentAlerts: true,
    reviews: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showLocation: true,
    showEarnings: false,
    allowDirectMessages: true
  });

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: SettingsIcon }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderAccountSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Profile Information */}
      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          PROFILE INFORMATION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              FULL NAME
            </label>
            <input
              type="text"
              defaultValue={user?.fullName || ""}
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              LOCATION
            </label>
            <input
              type="text"
              placeholder="New York, NY"
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
            BIO
          </label>
          <textarea
            rows={4}
            placeholder="Tell others about yourself and your skills..."
            className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                     text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                     tracking-wider font-mono resize-none"
          />
        </div>
      </div>

      {/* Password & Security */}
      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          PASSWORD & SECURITY
        </h3>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 bg-black/30 border border-white/20 rounded-lg
                     text-white hover:border-orange-400/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-orange-400" />
              <span className="font-bold tracking-wider">Change Password</span>
            </div>
            <span className="text-white/60">→</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 bg-black/30 border border-white/20 rounded-lg
                     text-white hover:border-orange-400/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-orange-400" />
              <span className="font-bold tracking-wider">Two-Factor Authentication</span>
            </div>
            <span className="text-green-400 text-sm">ENABLED</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderNotificationSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          NOTIFICATION PREFERENCES
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-black/30 border border-white/20 rounded-lg">
              <span className="text-white font-bold tracking-wider capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNotificationChange(key)}
                className={`
                  relative w-12 h-6 rounded-full transition-colors duration-200
                  ${value ? 'bg-orange-400' : 'bg-white/30'}
                `}
              >
                <motion.div
                  animate={{ x: value ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPrivacySettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          PRIVACY SETTINGS
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-black/30 border border-white/20 rounded-lg">
            <label className="block text-white font-bold tracking-wider mb-2">
              Profile Visibility
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="contacts">Contacts Only</option>
            </select>
          </div>

          {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-black/30 border border-white/20 rounded-lg">
              <span className="text-white font-bold tracking-wider capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePrivacyChange(key, !value)}
                className={`
                  relative w-12 h-6 rounded-full transition-colors duration-200
                  ${value ? 'bg-orange-400' : 'bg-white/30'}
                `}
              >
                <motion.div
                  animate={{ x: value ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPaymentSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          PAYMENT METHODS
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-black/30 border border-white/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-orange-400" />
              <div>
                <p className="text-white font-bold tracking-wider">•••• •••• •••• 4242</p>
                <p className="text-white/60 text-sm tracking-wide">Expires 12/25</p>
              </div>
            </div>
            <span className="text-green-400 text-sm font-bold">PRIMARY</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 border-2 border-dashed border-white/30 rounded-lg
                     text-white/60 hover:border-orange-400/50 hover:text-orange-400
                     transition-colors duration-200 font-bold tracking-wider"
          >
            + ADD PAYMENT METHOD
          </motion.button>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          PAYOUT SETTINGS
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              PAYOUT SCHEDULE
            </label>
            <select
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            >
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              MINIMUM PAYOUT AMOUNT
            </label>
            <input
              type="number"
              defaultValue="50"
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white placeholder-white/50 focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPreferences = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gray-900/50 border border-white/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-white mb-4">
          APPEARANCE
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              THEME
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Dark', 'Light', 'Auto'].map((theme) => (
                <motion.button
                  key={theme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-3 rounded-lg border transition-colors duration-200 font-bold tracking-wider text-sm
                    ${theme === 'Dark' 
                      ? 'bg-orange-400/20 border-orange-400/50 text-orange-400'
                      : 'bg-black/30 border-white/30 text-white hover:border-orange-400/50'
                    }
                  `}
                >
                  {theme}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              LANGUAGE
            </label>
            <select
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-bold tracking-wider mb-2">
              TIMEZONE
            </label>
            <select
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg
                       text-white focus:border-orange-400 focus:outline-none
                       tracking-wider font-mono"
            >
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-6 (Central Time)</option>
              <option>UTC-7 (Mountain Time)</option>
              <option>UTC-8 (Pacific Time)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
        <h3 className="text-lg font-black tracking-widest text-red-400 mb-4">
          DANGER ZONE
        </h3>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-red-900/30 border border-red-500/50 rounded-lg
                     text-red-400 font-bold tracking-wider hover:bg-red-900/50 transition-colors duration-200"
          >
            <Trash2 className="w-5 h-5" />
            <span>DELETE ACCOUNT</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountSettings();
      case "notifications":
        return renderNotificationSettings();
      case "privacy":
        return renderPrivacySettings();
      case "payments":
        return renderPaymentSettings();
      case "preferences":
        return renderPreferences();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-black tracking-widest text-white">
            SETTINGS
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-white/50"></div>
          <p className="text-white/70 tracking-wider">
            Configure your account preferences and privacy settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 border border-white/30 p-4 rounded-lg">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                        transition-all duration-200 text-left
                        ${activeTab === tab.id 
                          ? 'bg-orange-400/20 border border-orange-400/50 text-orange-400' 
                          : 'hover:bg-white/10 border border-transparent hover:border-white/30 text-white/80 hover:text-white'
                        }
                      `}
                    >
                      <Icon size={18} />
                      <span className="font-bold tracking-wider text-sm">
                        {tab.label}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {renderTabContent()}
            
            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-end pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-orange-400/20 border border-orange-400/50 rounded-lg
                         text-orange-400 font-bold tracking-wider
                         hover:bg-orange-400/30 transition-colors duration-200 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>SAVE CHANGES</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}