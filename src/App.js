import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/videos`)
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  // Organize videos by category
  const videosByCategory = videos.reduce((acc, video) => {
    acc[video.category] = acc[video.category] || [];
    acc[video.category].push(video);
    return acc;
  }, {});

  return (
    <div>
      <h1>MyFlix</h1>
      {Object.entries(videosByCategory).map(([category, videosInCategory]) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="video-container">
            {videosInCategory.map(video => (
              <div key={video._id} className="video-item">
                <h3>{video.name}</h3>
                <video width="320" height="240" controls>
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;