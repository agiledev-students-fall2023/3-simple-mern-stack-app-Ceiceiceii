import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutUs = props => {
  const [data, setData] = useState({ text1: '', text2: '', imageUrl: '' });
  const [loading, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const PicUrl = `${process.env.REACT_APP_SERVER_HOSTNAME}/TracyZhang.jpg`;
  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchData = () => {

    axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const data = response.data
        setData(data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  useEffect(() => {
    // fetch messages this once
    fetchData()

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
      fetchData()
    }, 5000)

    // return a function that will be called when this component unloads
    return e => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle)
    }
  }, [])


  return (
    <div>
      <h1>"About Me"</h1>
      <p>{data.text1}</p>
      <p>{data.text2}</p>
      <img src={PicUrl} alt="Tracy" />
    </div>
  );
};

export default AboutUs;
