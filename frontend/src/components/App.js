import React, { useState, useEffect } from 'react';
import AdjectiveForm from './AdjectiveForm';
import Posts from './Posts';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root')

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [defaultStories, setDefaultStories] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [defaultStoryInput, setDefaultStoryInput] = useState('');
  const [stories, setStories] = useState([]);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      setIsTop(Math.min(1, scrollTop / windowHeight));
    };
  
    checkScroll();
  
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  useEffect(() => {
    getStories()
  }, [])

  console.log(defaultStories)
  
  function getStories() {
    fetch('http://localhost:3000/default_stories')
    .then(response => response.json())
    .then(data => setDefaultStories(data))
    fetch('http://localhost:3000/custom_stories')
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
      fetch('http://localhost:3000/default_stories', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "content": defaultStoryInput
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
    <div className='App'>
      <div className='title-container' style={{ opacity: isTop ? 0 : 1 }}>
        <h1 className='text-center'>HappyLibs</h1>
      </div>
      <div style={{ paddingTop: '5em' }}> 
      <h3 className='main-text'>Welcome to HappyLibs! The idea here is simple - plug in the corresponding word type with what is requested above the text boxes and hit submit to generate a random story. If you are confused about any definitions, hover over the word type for a brief definition and examples.</h3>
        <br></br>
        <div className='open-modal'>
          <p>Interested in submitting your own story template for others to use in the future?</p>
          <button className='open-modal-button' onClick={() => setModalIsOpen(true)}>Click here!</button>
        </div>
        <div style={{ display: 'block' }}>
          <AdjectiveForm getStories={getStories} defaultStories={defaultStories}/>
          <Posts stories={stories} getStories={getStories}/>
        </div>
        <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        >
          <form onSubmit={handleDefaultStorySubmit}>
            <textarea 
              style={{width: '100%', height: '200px'}} 
              placeholder="Enter your story here..."
              onChange={(e) => setDefaultStoryInput(e.target.value)}
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