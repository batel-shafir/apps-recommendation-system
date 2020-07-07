import React, {useState} from 'react';
import LoginDialog from './LoginDialog';
import './Home.css';
import RecommendedApps from './RecommendedApps';

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
    return (
      <div>
        {!userLoggedIn &&
          <div className="home-container">
            <div className="title">IronApps</div>
            <div className="sub-title">The apps recommendation system.</div>
             <LoginDialog setLoggedIn={setUserLoggedIn}/>
          </div>
        }
        {userLoggedIn && 
          <RecommendedApps></RecommendedApps>
        }
      </div>
    );
  }

