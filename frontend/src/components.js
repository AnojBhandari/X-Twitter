import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons (SVG components)
const HomeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 19v-6h6v6h4v-8h3L12 3 2 11h3v8z"/>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const NotificationIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const MessageIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);

const BookmarkIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
);

const ListIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const ProfileIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const SettingsIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const RetweetIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
  </svg>
);

const ReplyIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
  </svg>
);

const ShareIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
);

const MoreIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

const EmojiIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TrendingIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const VerifiedIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H9L3,7V9H21M12,7.5C9.04,7.5 6.5,10.04 6.5,13S9.04,18.5 12,18.5S17.5,15.96 17.5,13S15.96,7.5 12,7.5M12,9C14.07,9 15.75,10.68 15.75,12.75S14.07,16.5 12,16.5S8.25,14.82 8.25,12.75S9.93,9 12,9Z"/>
  </svg>
);

// Sidebar Component
const Sidebar = ({ darkMode, setDarkMode, currentUser, setShowSearchModal }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { name: 'Home', icon: HomeIcon, path: '/' },
    { name: 'Explore', icon: TrendingIcon, path: '/explore' },
    { name: 'Notifications', icon: NotificationIcon, path: '/notifications' },
    { name: 'Messages', icon: MessageIcon, path: '/messages' },
    { name: 'Bookmarks', icon: BookmarkIcon, path: '/bookmarks' },
    { name: 'Lists', icon: ListIcon, path: '/lists' },
    { name: 'Profile', icon: ProfileIcon, path: '/profile' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' }
  ];

  return (
    <div className={`w-64 h-screen sticky top-0 p-4 border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8">
          <XIcon className="w-8 h-8 text-blue-500" />
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 py-3 px-4 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-900 text-white' 
                  : 'hover:bg-gray-100 text-black'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Post Tweet Button */}
        <button className="w-full bg-blue-500 text-white py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition-colors mb-4">
          Post
        </button>

        {/* User Profile */}
        <div className={`flex items-center space-x-3 p-3 rounded-full transition-colors ${
          darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
        }`}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-semibold">{currentUser.name}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              @{currentUser.username}
            </p>
          </div>
          <MoreIcon className="w-5 h-5" />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`mt-4 px-4 py-2 rounded-full border transition-colors ${
            darkMode 
              ? 'border-gray-700 bg-gray-800 text-white hover:bg-gray-700' 
              : 'border-gray-300 bg-white text-black hover:bg-gray-100'
          }`}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  );
};

// Tweet Composer Component
const TweetComposer = ({ darkMode, onPostTweet, currentUser }) => {
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && content.length <= maxChars) {
      onPostTweet(content);
      setContent('');
      setCharCount(0);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setCharCount(value.length);
  };

  return (
    <div className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-4`}>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={handleChange}
              placeholder="What's happening?"
              className={`w-full p-2 text-xl resize-none border-none outline-none ${
                darkMode 
                  ? 'bg-black text-white placeholder-gray-500' 
                  : 'bg-white text-black placeholder-gray-400'
              }`}
              rows="3"
              maxLength={maxChars}
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <button type="button" className={`p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
                }`}>
                  <ImageIcon className="w-5 h-5 text-blue-500" />
                </button>
                <button type="button" className={`p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
                }`}>
                  <EmojiIcon className="w-5 h-5 text-blue-500" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${
                  charCount > maxChars * 0.9 ? 'text-red-500' : 
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {charCount}/{maxChars}
                </span>
                <button
                  type="submit"
                  disabled={!content.trim() || charCount > maxChars}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${
                    (!content.trim() || charCount > maxChars)
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// Tweet Card Component
const TweetCard = ({ tweet, darkMode, onTweetAction }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-4 hover:bg-opacity-50 transition-colors ${
      darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-50'
    }`}>
      <div className="flex space-x-3">
        <img 
          src={tweet.user.avatar} 
          alt={tweet.user.name}
          className="w-12 h-12 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{tweet.user.name}</span>
            {tweet.user.verified && (
              <VerifiedIcon className="w-5 h-5 text-blue-500" />
            )}
            {tweet.user.isSubscribed && (
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">X</span>
            )}
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              @{tweet.user.username}
            </span>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>·</span>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {tweet.timestamp}
            </span>
          </div>
          
          <div className="mt-2">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
          </div>
          
          {tweet.images && tweet.images.length > 0 && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img 
                src={tweet.images[0]} 
                alt="Tweet image"
                className="w-full max-h-96 object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 max-w-md">
            <button 
              className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
              }`}
            >
              <ReplyIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">{formatNumber(tweet.replies)}</span>
            </button>
            
            <button 
              onClick={() => onTweetAction(tweet.id, 'retweet')}
              className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
                tweet.isRetweeted 
                  ? 'text-green-500' 
                  : darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
              }`}
            >
              <RetweetIcon className="w-5 h-5" />
              <span className="text-sm">{formatNumber(tweet.retweets)}</span>
            </button>
            
            <button 
              onClick={() => onTweetAction(tweet.id, 'like')}
              className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
                tweet.isLiked 
                  ? 'text-red-500' 
                  : darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
              }`}
            >
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm">{formatNumber(tweet.likes)}</span>
            </button>
            
            <button 
              className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
              }`}
            >
              <ShareIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">{formatNumber(tweet.views)}</span>
            </button>
            
            <button 
              onClick={() => onTweetAction(tweet.id, 'bookmark')}
              className={`p-2 rounded-full transition-colors ${
                tweet.isBookmarked 
                  ? 'text-blue-500' 
                  : darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
              }`}
            >
              <BookmarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Feed Component
const MainFeed = ({ tweets, darkMode, onTweetAction, onPostTweet, currentUser, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Home</h1>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <XIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Tweet Composer */}
      <TweetComposer 
        darkMode={darkMode} 
        onPostTweet={onPostTweet} 
        currentUser={currentUser}
      />

      {/* Tweets Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetCard 
            key={tweet.id} 
            tweet={tweet} 
            darkMode={darkMode} 
            onTweetAction={onTweetAction}
          />
        ))}
      </div>
    </div>
  );
};

// Right Sidebar Component
const RightSidebar = ({ darkMode, trends, suggestions }) => {
  return (
    <div className="w-80 p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search X"
          className={`w-full pl-10 pr-4 py-3 rounded-full border-none outline-none ${
            darkMode 
              ? 'bg-gray-900 text-white placeholder-gray-500' 
              : 'bg-gray-100 text-black placeholder-gray-400'
          }`}
        />
      </div>

      {/* Trends */}
      <div className={`rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4`}>
        <h2 className="text-xl font-bold mb-3">What's happening</h2>
        <div className="space-y-3">
          {trends.map((trend) => (
            <div key={trend.id} className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}>
              <p className="font-semibold">{trend.name}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {trend.posts}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className={`rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4`}>
        <h2 className="text-xl font-bold mb-3">Who to follow</h2>
        <div className="space-y-3">
          {suggestions.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{user.name}</span>
                    {user.verified && (
                      <VerifiedIcon className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    @{user.username}
                  </p>
                </div>
              </div>
              <button className="px-4 py-1 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Profile Page Component
const ProfilePage = ({ user, tweets, darkMode, onTweetAction, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-4 p-4">
          <button className={`p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
          }`}>
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {tweets.length} posts
            </p>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative">
        <div className={`h-48 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
        <div className="absolute -bottom-16 left-4">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-black"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4 pt-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.verified && (
                <VerifiedIcon className="w-6 h-6 text-blue-500" />
              )}
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              @{user.username}
            </p>
          </div>
          <button className="px-6 py-2 border border-gray-500 rounded-full font-medium hover:bg-gray-100 hover:text-black transition-colors">
            Edit profile
          </button>
        </div>

        <p className="mb-4">{user.bio}</p>

        <div className="flex space-x-4 mb-4">
          <span><strong>{user.following}</strong> Following</span>
          <span><strong>{user.followers}</strong> Followers</span>
        </div>

        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {user.joinedDate}
        </p>
      </div>

      {/* Tweets */}
      <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        {tweets.map((tweet) => (
          <TweetCard 
            key={tweet.id} 
            tweet={tweet} 
            darkMode={darkMode} 
            onTweetAction={onTweetAction}
          />
        ))}
      </div>
    </div>
  );
};

// Explore Page Component
const ExplorePage = ({ trends, tweets, darkMode, onTweetAction, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Explore</h1>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search X"
            className={`w-full pl-10 pr-4 py-3 rounded-full border-none outline-none ${
              darkMode 
                ? 'bg-gray-900 text-white placeholder-gray-500' 
                : 'bg-gray-100 text-black placeholder-gray-400'
            }`}
          />
        </div>
      </div>

      {/* Trending */}
      <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-4`}>
        <h2 className="text-xl font-bold mb-4">Trending</h2>
        <div className="space-y-4">
          {trends.map((trend) => (
            <div key={trend.id} className={`p-3 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
            }`}>
              <p className="font-semibold text-lg">{trend.name}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {trend.posts}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tweets */}
      <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Popular</h2>
        </div>
        {tweets.slice(0, 3).map((tweet) => (
          <TweetCard 
            key={tweet.id} 
            tweet={tweet} 
            darkMode={darkMode} 
            onTweetAction={onTweetAction}
          />
        ))}
      </div>
    </div>
  );
};

// Mobile Bottom Navigation Component
const MobileBottomNav = ({ darkMode }) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${
      darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    } border-t`}>
      <div className="flex justify-around items-center py-2">
        <Link to="/" className="p-3">
          <HomeIcon className="w-6 h-6" />
        </Link>
        <Link to="/explore" className="p-3">
          <TrendingIcon className="w-6 h-6" />
        </Link>
        <Link to="/notifications" className="p-3">
          <NotificationIcon className="w-6 h-6" />
        </Link>
        <Link to="/messages" className="p-3">
          <MessageIcon className="w-6 h-6" />
        </Link>
        <Link to="/profile" className="p-3">
          <ProfileIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

// Search Modal Component
const SearchModal = ({ darkMode, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className={`w-full max-w-2xl mx-4 ${
        darkMode ? 'bg-black' : 'bg-white'
      } rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Search</h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100'
            }`}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search X"
            className={`w-full pl-10 pr-4 py-3 rounded-full border-none outline-none ${
              darkMode 
                ? 'bg-gray-900 text-white placeholder-gray-500' 
                : 'bg-gray-100 text-black placeholder-gray-400'
            }`}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

// Notification Page Component
const NotificationsPage = ({ darkMode, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No notifications yet
        </p>
      </div>
    </div>
  );
};

// Messages Page Component
const MessagesPage = ({ darkMode, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No messages yet
        </p>
      </div>
    </div>
  );
};

// Bookmarks Page Component
const BookmarksPage = ({ darkMode, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Bookmarks</h1>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No bookmarks yet
        </p>
      </div>
    </div>
  );
};

// Lists Page Component
const ListsPage = ({ darkMode, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Lists</h1>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No lists yet
        </p>
      </div>
    </div>
  );
};

// Settings Page Component
const SettingsPage = ({ darkMode, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Settings coming soon
        </p>
      </div>
    </div>
  );
};

// Tweet Detail Component
const TweetDetail = ({ tweet, darkMode, onTweetAction }) => {
  return (
    <div className="flex-1">
      <div className={`sticky top-0 z-10 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </div>
      <TweetCard tweet={tweet} darkMode={darkMode} onTweetAction={onTweetAction} />
    </div>
  );
};

// User Profile Component
const UserProfile = ({ user, darkMode }) => {
  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex items-center space-x-3">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">{user.name}</span>
            {user.verified && (
              <VerifiedIcon className="w-5 h-5 text-blue-500" />
            )}
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            @{user.username}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export all components
export default {
  Sidebar,
  MainFeed,
  RightSidebar,
  TweetComposer,
  TweetCard,
  ProfilePage,
  TweetDetail,
  ExplorePage,
  NotificationsPage,
  MessagesPage,
  BookmarksPage,
  ListsPage,
  SettingsPage,
  SearchModal,
  UserProfile,
  MobileBottomNav
};