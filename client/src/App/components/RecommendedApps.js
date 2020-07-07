import React, {useState, useEffect} from 'react';
import GalleryView from './GalleryView';

export default function RecommendedApps() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getApps = () => {
      fetch('/api/getApps')
      .then(res => res.json())
      .then(list => {
        setApps(list)
      })
    }
    getApps();
  },[]);

  return (
    <div className="App">
    <GalleryView appData={apps}></GalleryView>
    </div>
    );
}
