import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Filter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import icon from '../images/spotify.svg'



const PlayList = () => {

    const [country, setCountry] = useState({ value: "IN", label: "India" })
    const [playlist, setPlaylist] = useState([])
    

    
    function handleChange(val) {
        setCountry(val);
    }

    

    useEffect(() => {

        toast('🦄 Please wait a second', {
            position: "top-right",
            autoClose:1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        function getData()
        {
            console.log("data Fetched");
            axios.get(
                'https://spotify-profile.herokuapp.com/refresh_token?refresh_token=AQDWXq2oxftyfzY76COQXuxWaXK1TsqYpyRLJokd_r_q1wQbF0KvRpRDT6u41OaxAOshMsl9kJiKP2WzTE0Lrv6pNnqTbpeoDT-yAdjsTPdMzDtJp1Xo-HI3BOxGrsgKh3A',
            ).then((res) => {
                axios
                    .get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country.value}&limit=10`, {
                        headers: {
                            Authorization: 'Bearer ' + res.data.access_token,
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((res) => {
                        
                        setPlaylist(res.data.playlists.items)
                    })
                    .catch((event) => {

                        toast.error(event.response.data.error.message + " (Please provide relevant country)", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined
                        });
                    })
            })
        }

        getData();
        const interval = setInterval(() => {
            getData();
        }, 30000);
        return () => clearInterval(interval);
    

        
    },[country])

  return (
      <div>
          <div>
              <Filter onChange={handleChange} />
          </div>
          <div className='container'>
          {
              playlist.map((val, index) =>
                
                  <div key={index} className="card">
                      <div className="card-header">
                          <img src={val.images[0].url} alt="Poster" />
                      </div>
                      <div className="card-body">
                          <span className="tag tag-teal"><h3>{val.name}</h3></span>
                          <h4>
                             {val.description}
                          </h4>
                          <h3>
                              Spotify
                          </h3>
                          <div className="miniPoster">
                              <img src={icon} alt="Poster" />
                          </div>
                      </div>
                  </div>
              )
          }
          </div>
    </div>
  )
}

export default PlayList