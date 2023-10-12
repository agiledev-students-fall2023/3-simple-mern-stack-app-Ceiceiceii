import { useState, useEffect } from 'react'
import loadingIcon from './loading.gif'
import './Message.css'
import axios from 'axios'

const About = props => {
  const [text, setText] = useState("")
  const [photo, setPhoto] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  const fetchInfo = () => {
      axios
          .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
          .then(response => {
              // axios bundles up all response data in response.data property
              const { text, photo } = response.data
              setText(text)
              setPhoto(photo)
          })
          .catch(err => {
              const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
              setError(errMsg)
          })
          .finally(() => {
              setLoaded(true)
          })
  }
  
  useEffect(() => {
    // fetch messages this once
    fetchInfo()
})
return (
  <>
        
        <article>
            {text}
        </article>
        <article className="photo">
        {error && <p className="Messages-error">{error}</p>}
        {!loaded && <img src={loadingIcon} alt="loading" />}
        {loaded && (<img src={photo} alt="profile" style={{ width: "40%" }} />
            )}
        
        </article>
    </>
)
}
  
  // make this component available to be imported into any other file
export default About