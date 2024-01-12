import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/videos`)
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      <h1>Netflix Clone</h1>
      <div>
        {videos.map(video => (
          <div key={video._id}>
            <h2>{video.name}</h2>
            <p>{video.description}</p>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;