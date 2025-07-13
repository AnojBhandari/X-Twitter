import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Components from './components';

const {
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
} = Components;

// Mock data for the application
const mockTweets = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Elon Musk',
      username: 'elonmusk',
      avatar: 'https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg',
      verified: true,
      isSubscribed: true
    },
    content: 'Making life multiplanetary 🚀',
    timestamp: '2h',
    likes: 45231,
    retweets: 12456,
    replies: 3421,
    views: 892341,
    images: [],
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  },
  {
    id: 2,
    user: {
      id: 2,
      name: 'Vercel',
      username: 'vercel',
      avatar: 'https://pbs.twimg.com/profile_images/1565985672501927936/d4AhgrcG_400x400.jpg',
      verified: true,
      isSubscribed: false
    },
    content: 'Just shipped a new feature that makes deployments 10x faster! 🚀\n\nTry it out and let us know what you think!',
    timestamp: '4h',
    likes: 2341,
    retweets: 892,
    replies: 234,
    views: 45231,
    images: [],
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true
  },
  {
    id: 3,
    user: {
      id: 3,
      name: 'OpenAI',
      username: 'OpenAI',
      avatar: 'https://pbs.twimg.com/profile_images/1634058036934500352/b4F1eVpJ_400x400.jpg',
      verified: true,
      isSubscribed: true
    },
    content: 'Introducing GPT-5: The next generation of AI that can understand and generate human-like text with unprecedented accuracy and creativity.',
    timestamp: '6h',
    likes: 78542,
    retweets: 23456,
    replies: 8932,
    views: 1234567,
    images: [],
    isLiked: false,
    isRetweeted: true,
    isBookmarked: false
  },
  {
    id: 4,
    user: {
      id: 4,
      name: 'GitHub',
      username: 'github',
      avatar: 'https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png',
      verified: true,
      isSubscribed: false
    },
    content: 'Code is poetry. Write it beautifully. ✨\n\n#GitHub #Coding #OpenSource',
    timestamp: '8h',
    likes: 5432,
    retweets: 1234,
    replies: 567,
    views: 67890,
    images: [],
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  },
  {
    id: 5,
    user: {
      id: 5,
      name: 'React',
      username: 'reactjs',
      avatar: 'https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_400x400.png',
      verified: true,
      isSubscribed: true
    },
    content: 'React 19 is now stable! 🎉\n\nNew features include:\n• Server Components\n• Concurrent Features\n• Suspense improvements\n• And much more!\n\nRead the full release notes: react.dev/blog/2024/04/25/react-19',
    timestamp: '12h',
    likes: 15432,
    retweets: 4567,
    replies: 1234,
    views: 234567,
    images: [],
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true
  }
];

const mockTrends = [
  { id: 1, name: '#GPT5', posts: '125K posts' },
  { id: 2, name: '#React19', posts: '89K posts' },
  { id: 3, name: '#SpaceX', posts: '67K posts' },
  { id: 4, name: '#OpenAI', posts: '45K posts' },
  { id: 5, name: '#AI', posts: '234K posts' },
  { id: 6, name: '#JavaScript', posts: '156K posts' },
  { id: 7, name: '#Python', posts: '123K posts' },
  { id: 8, name: '#WebDev', posts: '78K posts' }
];

const mockSuggestions = [
  {
    id: 1,
    name: 'TypeScript',
    username: 'typescript',
    avatar: 'https://pbs.twimg.com/profile_images/1337708654637678594/w2-zFFhP_400x400.jpg',
    verified: true,
    bio: 'TypeScript is a strongly typed programming language that builds on JavaScript.'
  },
  {
    id: 2,
    name: 'Next.js',
    username: 'nextjs',
    avatar: 'https://pbs.twimg.com/profile_images/1565985672501927936/d4AhgrcG_400x400.jpg',
    verified: true,
    bio: 'The React Framework for Production'
  },
  {
    id: 3,
    name: 'TailwindCSS',
    username: 'tailwindcss',
    avatar: 'https://pbs.twimg.com/profile_images/1468993891584073729/a_op8KnL_400x400.jpg',
    verified: true,
    bio: 'A utility-first CSS framework'
  }
];

const mockCurrentUser = {
  id: 999,
  name: 'You',
  username: 'yourhandle',
  avatar: 'https://pbs.twimg.com/profile_images/1337708654637678594/w2-zFFhP_400x400.jpg',
  verified: false,
  isSubscribed: false,
  bio: 'Developer passionate about building great user experiences',
  followers: 1234,
  following: 567,
  location: 'San Francisco, CA',
  website: 'https://yourwebsite.com',
  joinedDate: 'Joined March 2020'
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [tweets, setTweets] = useState(mockTweets);
  const [currentUser, setCurrentUser] = useState(mockCurrentUser);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTweetAction = (tweetId, action) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        switch (action) {
          case 'like':
            return {
              ...tweet,
              isLiked: !tweet.isLiked,
              likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1
            };
          case 'retweet':
            return {
              ...tweet,
              isRetweeted: !tweet.isRetweeted,
              retweets: tweet.isRetweeted ? tweet.retweets - 1 : tweet.retweets + 1
            };
          case 'bookmark':
            return {
              ...tweet,
              isBookmarked: !tweet.isBookmarked
            };
          default:
            return tweet;
        }
      }
      return tweet;
    }));
  };

  const handlePostTweet = (content) => {
    const newTweet = {
      id: Date.now(),
      user: currentUser,
      content,
      timestamp: 'now',
      likes: 0,
      retweets: 0,
      replies: 0,
      views: 0,
      images: [],
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false
    };
    setTweets([newTweet, ...tweets]);
  };

  const HomePage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-6xl mx-auto flex">
        {!isMobile && (
          <Sidebar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            currentUser={currentUser}
            setShowSearchModal={setShowSearchModal}
          />
        )}
        
        <MainFeed 
          tweets={tweets} 
          darkMode={darkMode} 
          onTweetAction={handleTweetAction}
          onPostTweet={handlePostTweet}
          currentUser={currentUser}
          isMobile={isMobile}
        />
        
        {!isMobile && (
          <RightSidebar 
            darkMode={darkMode} 
            trends={mockTrends}
            suggestions={mockSuggestions}
          />
        )}
      </div>
      
      {isMobile && (
        <MobileBottomNav darkMode={darkMode} />
      )}
      
      {showSearchModal && (
        <SearchModal 
          darkMode={darkMode} 
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );

  const ProfilePageWrapper = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-6xl mx-auto flex">
        {!isMobile && (
          <Sidebar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            currentUser={currentUser}
            setShowSearchModal={setShowSearchModal}
          />
        )}
        
        <ProfilePage 
          user={currentUser}
          tweets={tweets.filter(t => t.user.id === currentUser.id)}
          darkMode={darkMode}
          onTweetAction={handleTweetAction}
          isMobile={isMobile}
        />
        
        {!isMobile && (
          <RightSidebar 
            darkMode={darkMode} 
            trends={mockTrends}
            suggestions={mockSuggestions}
          />
        )}
      </div>
      
      {isMobile && (
        <MobileBottomNav darkMode={darkMode} />
      )}
    </div>
  );

  const ExplorePageWrapper = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-6xl mx-auto flex">
        {!isMobile && (
          <Sidebar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            currentUser={currentUser}
            setShowSearchModal={setShowSearchModal}
          />
        )}
        
        <ExplorePage 
          trends={mockTrends}
          tweets={tweets}
          darkMode={darkMode}
          onTweetAction={handleTweetAction}
          isMobile={isMobile}
        />
        
        {!isMobile && (
          <RightSidebar 
            darkMode={darkMode} 
            trends={mockTrends}
            suggestions={mockSuggestions}
          />
        )}
      </div>
      
      {isMobile && (
        <MobileBottomNav darkMode={darkMode} />
      )}
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePageWrapper />} />
        <Route path="/explore" element={<ExplorePageWrapper />} />
        <Route path="/notifications" element={<HomePage />} />
        <Route path="/messages" element={<HomePage />} />
        <Route path="/bookmarks" element={<HomePage />} />
        <Route path="/lists" element={<HomePage />} />
        <Route path="/settings" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;