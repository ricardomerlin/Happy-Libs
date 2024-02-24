import React, { useState, useEffect } from 'react';
import AdjectiveForm from './AdjectiveForm';
import Posts from './Posts';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root')

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [defaultStory, setDefaultStory] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [stories, setStories] = useState([]);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      setIsTop(Math.min(1, scrollTop / windowHeight));
    };
  
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  useEffect(() => {
    getStories()
  }, [])
  
  function getStories() {
    fetch('http://127.0.0.1:5555/stories')
      .then(response => response.json())
      .then(data => setStories(data))
  }

  useEffect(() => {
      if (modalIsOpen === true) {
          document.body.classList.add('no-scroll')
      } else if (modalIsOpen === false) {
          document.body.classList.remove('no-scroll')
      }
  }, [modalIsOpen])

  function handleDefaultStorySubmit(e) {
      e.preventDefault();
      setSubmitSuccess(true);
      fetch('http://127.0.0.1:5555/default_stories', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "content": defaultStory
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      }

  return (
    <div>
      <div className='title-container' style={{ opacity: isTop ? 0 : 1 }}>        <h1 className='text-center'>HappyLibs</h1>
      </div>
      <div style={{ paddingTop: '4em' }}> 
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AdjectiveForm getStories={getStories}/>
          <Posts stories={stories}/>
        </div>
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h2>Modal Title</h2>
          <p>Modal Body</p>
          <form onSubmit={handleDefaultStorySubmit}>
            <textarea 
              style={{width: '100%', height: '200px'}} 
              placeholder="Enter your story here..."
              onChange={(e) => setDefaultStory(e.target.value)}
            />
            {submitSuccess ? <p>Submitted!</p> : <button>Submit</button>}
          </form>
          <div>
            <button onClick={() => {
              setModalIsOpen(false);
              setSubmitSuccess(false);
            }}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default App;