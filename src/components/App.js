import React, { useState, useEffect } from 'react';
import AdjectiveForm from './AdjectiveForm';
import Posts from './Posts';
import Modal from 'react-modal';
import '../App.css';
import badWords from '../bad-words';

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

  
  function getStories() {
    fetch('http://localhost:3000/default_stories')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const filteredData = data.filter(story => {
        for (let word of badWords) {
          if (story.content.toLowerCase().includes(word)) {
            console.log(story.content)
            return false;
          }
        }
        return true;
      });
      setDefaultStories(filteredData);
    });
  
    fetch('http://localhost:3000/custom_stories')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const filteredData = data.filter(story => {
        for (let word of badWords) {
          if (story.story.toLowerCase().includes(word)) {
            console.log(story + word)
            return false;
          }
        }
        return true;
      });
      setStories(filteredData);
    });
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

    const requiredTexts = ['singular_noun', 'plural_noun', 'past_tense_verb', 'adjective1', 'adjective2'];
    let isValid = true;
  
    requiredTexts.forEach((text) => {
      if (!defaultStoryInput.includes(text)) {
        isValid = false;
      }
    });
  
    if (!isValid) {
      alert('Your story must include the following pieces of text at their desired location: singular_noun, plural_noun, past_tense_verb, adjective1, adjective2');
      return;
    }

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
      <div className='title-container' style={{ opacity: isTop ? 0.1 : 1 }}>
        <h1 className='text-center'>HappyLibs</h1>
      </div>
      <div style={{ paddingTop: '5em' }}> 
      <h3 className='main-text'>Welcome to HappyLibs! The idea here is simple - plug in the corresponding word type with what is requested above the text boxes and hit submit to generate a random story. If you are confused about any definitions, hover over the word type for a brief definition and examples.</h3>
        <br></br>
        <div style={{ display: 'block' }}>
          <AdjectiveForm getStories={getStories} defaultStories={defaultStories}/>
          <div className='open-modal'>
            <p>Interested in submitting your own story template for others to use in the future?</p>
            <button className='open-modal-button' onClick={() => setModalIsOpen(true)}>Click here!</button>
          </div>
          <Posts stories={stories} getStories={getStories}/>
        </div>
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#f0f0f0',
              borderRadius: '10px',
              padding: '20px',
              width: '80%',
              maxWidth: '500px',
              fontFamily: 'Courier New'
            }
          }}
        >
          <p className='text-center' style={{marginTop:'10px'}}>In order for your story to be submitted and useable for future, you must have the following 5 pieces of text at their desired location: <br></br><strong>• singular_noun</strong><br></br><strong>• plural_noun</strong><br></br><strong>• past_tense_verb</strong><br></br><strong>• adjective1</strong><br></br><strong>• adjective2</strong></p>
          <p className='text-center'>So, I would submit a story that looks like this:<br></br><br></br>The adjective1 plural_noun were upset because the singular_noun past_tense_verb all over the adjective2 floor.</p>
          <form className='text-center' onSubmit={handleDefaultStorySubmit}>
            <textarea 
              style={{width: '100%', height: '200px'}} 
              placeholder="Enter your story here..."
              onChange={(e) => setDefaultStoryInput(e.target.value)}
            />
            {submitSuccess ? <p>Submitted!</p> : <button style={{padding:'2px', margin:'4px'}} className='btn btn-primary'>Submit</button>}
          </form>
          <div className='text-center'>
            <button className="btn btn-secondary" style={{padding:'1px', margin:'2px'}}onClick={() => {
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