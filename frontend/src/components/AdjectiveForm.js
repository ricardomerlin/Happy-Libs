import React from 'react';
import { useState } from 'react';

function AdjectiveForm({ getStories }) {

    const [singularNoun, setSingularNoun] = useState('');
    const [pluralNoun, setPluralNoun] = useState('');
    const [pastTenseVerb, setPastTenseVerb] = useState('');
    const [adjective1, setAdjective1] = useState('');
    const [adjective2, setAdjective2] = useState('');

    
    function handleFormSubmit(e) {
        e.preventDefault();
        fetch('http://127.0.0.1:5555/stories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "singular_noun": singularNoun,
            "plural_noun": pluralNoun,
            "past_tense_verb": pastTenseVerb,
            "adjective1": adjective1,
            "adjective2": adjective2
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
            <form id="questionnaire" onSubmit={handleFormSubmit}>
                <li title="A singular noun refers to only one person, place, or thing. Some examples include a cat, an idea, a fruit - just make sure to only have 1!">Noun(singular)
                    <p>
                        <input id="singular-noun-input" type="text" placeholder="answer" onChange={(e) => setSingularNoun(e.target.value)}/>
                    </p>
                </li>
                <li title="A plural noun refers to more than one person, place, or thing. Examples include 'cats', 'ideas', 'fruits'.">Noun (plural):
                    <p>
                        <input id="plural-noun-input" type="text" placeholder="answer" onChange={(e) => setPluralNoun(e.target.value)}/>
                    </p>
                </li>
                <li title="A past tense verb is a verb that indicates an action, event, or condition that occurred in the past. For example, 'ran', 'saw', 'was'.">Verb (past tense):
                    <p>
                        <input id="past-tense-verb-input" type="text" placeholder="answer" onChange={(e) => setPastTenseVerb(e.target.value)}/>
                    </p>
                </li>
                <li title="An adjective is a word that describes or modifies a noun. It can describe qualities such as size, color, feeling, and more. Examples include 'happy', 'blue', 'large'.">Adjective:
                    <p>
                        <input id="adjective-1-input" type="text" placeholder="answer" onChange={(e) => setAdjective1(e.target.value)}/>
                    </p>
                </li>
                <li title="An adjective is a word that describes or modifies a noun. It can describe qualities such as size, color, feeling, and more. Examples include 'happy', 'blue', 'large'.">Adjective:
                    <p>
                        <input id="adjective-2-input" type="text" placeholder="answer" onChange={(e) => setAdjective2(e.target.value)}/>
                    </p>
                </li>
                <p>
                    <button>Submit</button>
                </p>
            </form>
        </div>
    );
}

export default AdjectiveForm;