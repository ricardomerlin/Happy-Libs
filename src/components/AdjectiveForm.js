import React, { useState } from 'react';

function AdjectiveForm({ getStories, defaultStories }) {

    const [singularNoun, setSingularNoun] = useState('');
    const [pluralNoun, setPluralNoun] = useState('');
    const [pastTenseVerb, setPastTenseVerb] = useState('');
    const [adjective1, setAdjective1] = useState('');
    const [adjective2, setAdjective2] = useState('');

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!singularNoun || !pluralNoun || !pastTenseVerb || !adjective1 || !adjective2) {
            alert('All fields must be filled out!');
            return;
        }
        let randomNumber = Math.floor(Math.random() * defaultStories.length);
        let randomStory = defaultStories[randomNumber];
        let filledStory = randomStory.content
            .replace('${singular_noun}', singularNoun)
            .replace('${plural_noun}', pluralNoun)
            .replace('${past_tense_verb}', pastTenseVerb)
            .replace('${adjective1}', adjective1)
            .replace('${adjective2}', adjective2);
    
        fetch('http://localhost:3000/custom_stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "story": filledStory,
                "likes": 0
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            getStories();
            return response.json();
        })
        .catch(e => console.log('There was an error: ', e));
    }

    return (
        <div>
            <h4 style={{fontSize:'2vw', marginTop:'2vh'}}>Fill out the form below to create a random story!</h4>
            <form className='input-container' onSubmit={handleFormSubmit}>
                <div className="input-list">
                    <li title="A singular noun refers to only one person, place, or thing. Some examples include a cat, an idea, a fruit - just make sure to only have 1!">Noun(singular)
                        <p className='input-slot'>
                            <input id="singular-noun-input" type="text" placeholder="answer" onChange={(e) => setSingularNoun(e.target.value)}/>
                        </p>
                    </li>
                    <li title="A plural noun refers to more than one person, place, or thing. Examples include 'cats', 'ideas', 'fruits'.">Noun (plural):
                        <p className='input-slot'>
                            <input id="plural-noun-input" type="text" placeholder="answer" onChange={(e) => setPluralNoun(e.target.value)}/>
                        </p>
                    </li>
                    <li title="A past tense verb is a verb that indicates an action, event, or condition that occurred in the past. For example, 'ran', 'saw', 'was'.">Verb (past tense):
                        <p className='input-slot'>
                            <input id="past-tense-verb-input" type="text" placeholder="answer" onChange={(e) => setPastTenseVerb(e.target.value)}/>
                        </p>
                    </li>
                    <li title="An adjective is a word that describes or modifies a noun. It can describe qualities such as size, color, feeling, and more. Examples include 'happy', 'blue', 'large'.">Adjective:
                        <p className='input-slot'>
                            <input id="adjective-1-input" type="text" placeholder="answer" onChange={(e) => setAdjective1(e.target.value)}/>
                        </p>
                    </li>
                    <li title="An adjective is a word that describes or modifies a noun. It can describe qualities such as size, color, feeling, and more. Examples include 'happy', 'blue', 'large'.">Adjective:
                        <p className='input-slot'>
                            <input id="adjective-2-input" type="text" placeholder="answer" onChange={(e) => setAdjective2(e.target.value)}/>
                        </p>
                    </li>
                </div>
                <p>
                    <button className='submit-form-button'>Submit</button>
                </p>
            </form>
        </div>
    );
}

export default AdjectiveForm;