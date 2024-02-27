import React, { useEffect, useState } from "react";

function Posts({ stories, getStories }) {
    const [storyMemes, setStoryMemes] = useState([]);
    const [memeLinks, setMemeLinks] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [memesInitialized, setMemesInitialized] = useState(false);


    useEffect(() => {
        if (!memesInitialized && stories.length > 0 && memeLinks.length > 0) {
            const newStoryMemes = stories.map(() => memeLinks[Math.floor(Math.random() * memeLinks.length)].link);
            setStoryMemes(newStoryMemes);
            setMemesInitialized(true);
        }
    }, [stories, memeLinks, memesInitialized]);

    useEffect(() => {
        fetch('http://localhost:3000/memes')
            .then(response => response.json())
            .then(data => setMemeLinks(data));
    }, []);

    function generateLightColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 30 + Math.random() * 40;
        const lightness = 70 + Math.random() * 30;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function handleLike(storyId) {
        console.log('Like button clicked for story with id:', storyId);
        fetch(`http://localhost:3000/custom_stories/${storyId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likes": stories.find(story => story.id === storyId).likes + 1
            })
        })
        .then(() => getStories());
        
        setLikedPosts(prevLikedPosts => ({
            ...prevLikedPosts,
            [storyId]: true
        }));
    }

    return (
        <div className="posts-container">
            {[...stories].reverse().map((story, index) => {
                const memeLink = storyMemes[index] || memeLinks[Math.floor(Math.random() * memeLinks.length)].link;
                if ((index + 1) % 5 === 0 && !storyMemes[index]) {
                    setStoryMemes(prevStoryMemes => [...prevStoryMemes, memeLink]);
                }
                return (
                    <>
                        <div className='individual-card' style={{ backgroundColor: generateLightColor() }} key={story.id}>
                            <p><strong>{story.story}</strong></p>
                            <p>𑗊 𑗊 𑗊</p>
                            {(story.likes === 1) ? <p>{story.likes} Like</p> : <p>{story.likes} Likes</p>}
                            {likedPosts[story.id] ? <p>Post Liked!</p> : <button className="like-button" onClick={() => handleLike(story.id)}>Like</button>}
                        </div>
                        {(index + 1) % 5 === 0 && (
                            <div className='card individual-card' key={`meme-${index}`}>
                                <img src={memeLink} alt="Meme" style={{ height: '100%' }} />
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
}

export default Posts;
