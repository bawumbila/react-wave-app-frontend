import { useState, useEffect } from "react";
import './App.css';


function App() {



  const [state, setState] = useState({
    user: null,
    tracks: [],
    topTracks: [],
    newTrack: {}, 
    loadedTracks: {
      track: '',
      artist: '', 
      title: '',
      image: '',
      name: '',
      url: '',
    }
  });


  async function searchTrack(e) {
    // if(!state.user) return;
    
    e.preventDefault();

    const BACKEND_URL = 'http://localhost:3001/api/tracks';

    // console.log(state.topTracks[state.newTrack.track].image[0].keys())
    // console.log(Array.from(state.topTracks[state.newTrack.track].image[0].0)

    const track = state.topTracks[state.newTrack.track];

    const tracktoSave = {
      'title': track.name,
      'url': track.url,
      'artist': track.artist.name,
      // 'image': track.image[0],
      'playcount': track.playcount,
      'artistURL':  track.artist.url
    }
    const savedTrack = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(tracktoSave)
      }).then(res => res.json());

    // setState((prevState) => ({
    //   ...prevState,
    //   // tracks: [...prevState.tracks, loadTrack],
    //   // newTrack: {
    //   //   artistName: "kanye",
    //   //   trackName: "glory",
    //   // },
    //   loadTrack: track
    // }));
      
    
  }

  function handleChange(e) {
    console.log(e.target.name)
    console.log(e.target.value)

    setState((prevState) => ({
      ...prevState, 
      newTrack: {
        ...prevState.newTrack,
        [e.target.name]: e.target.value
      }
    })) 
  }

  async function getAppData() {
    // if(!state.user) return;
    try {
      const BASE_URL = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=55b45039502bf33ba703cc81d8dc8e8d&format=json'; // &limit=200
      const tracks = await fetch(BASE_URL).then(res => res.json());
      // console.log(tracks);
      setState((prevState) => ({
        ...prevState,
        topTracks: tracks.tracks.track
      }));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppData();

  }, []);

  return (
    <main className="App">
      <header className="App-header">
        <h1>WAVe Music App</h1>
      </header>
      
      <>
        <hr />
          <form onSubmit={searchTrack}>
            <label>
              <span>Top Tracks</span>
              <select name="track" onChange={handleChange} > 
                {state.topTracks.map((s, idx) => (
                    <option key={s.name}  value={idx}>{s.name}</option>
                ))}
              </select>
            </label>
            <button>Add to Playlist</button>
          </form>
          {/* <section>
          {state.topTracks.map((s) => (
            <article >
              <div>{s.title}</div> <div>{s.artist}</div>
            </article>
          ))}
          </section> */}
        </>
      
    </main>
    
    
  );
}

export default App;
