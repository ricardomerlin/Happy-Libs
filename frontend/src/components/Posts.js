import { useEffect, useState } from "react";

function Posts({ stories, getStories }) {

    const [storyMemes, setStoryMemes] = useState([]);

    useEffect(() => {
        const newStoryMemes = stories.map(() => memes[Math.floor(Math.random() * memes.length)]);
        setStoryMemes(newStoryMemes);
    }, [stories]);

    const memes = [
        'https://www.lifewire.com/thmb/1NOvvEvy7NlIBLshEek1-N01kus=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GameofThronesmeme-a6b89f8bba5b4277ba655fb590a4179f.jpg',
        'https://plaky.com/blog/wp-content/uploads/2023/03/Procrastination-meme.png',
        'https://www.brosix.com/wp-content/uploads/6626fd2d23bf7634385dafe1926ad133.jpeg',
        'https://www.dispatch.com/gcdn/authoring/2012/12/06/NCOD/ghows-OH-5c1778b2-5eb4-4f8e-b68b-685b73e52232-44d9ba3a.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp',
        'https://img.wattpad.com/34e1e69b161fb9e437a15d7dac08eca9723dc81e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7276637165597276647369796d773d3d2d3533343233393230332e313531323639616430336438363563373139323334313730353136312e6a7067?s=fit&w=720&h=720',
        'https://www.lifewire.com/thmb/PiAB30sXKFcKSO_r72hP5-Hwq_E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BabywithFistmeme2-0c317ccc4d3a44c68098cd08f4ecac74.jpg',
        'https://www.care.com/c/wp-content/uploads/sites/2/2021/04/maressab-202115020615567399.jpg.optimal.jpg',
        'https://img.freepik.com/free-vector/simple-vibing-cat-square-meme_742173-4493.jpg?size=338&ext=jpg&ga=GA1.1.1488620777.1708646400&semt=ais',
        'https://www.bu.edu/files/2021/12/Meme-One.jpg',
        'https://www.rd.com/wp-content/uploads/2023/04/Hilarious-Cat-Memes-5.jpg?fit=700%2C700',
        'https://www.mommyshorts.com/wp-content/uploads/2013/05/6a0133f30ae399970b0192aa1b4c77970d-800wi.jpg'
    ];

    const mappedLikes = stories.map(() => 0);

    function handleLike(story, e) {
        e.preventDefault();
        console.log('Like button clicked');
        fetch(`http://localhost:3000/custom_stories/${story.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likes": story.likes + 1
            })
        })
        .then(() => getStories());
    }

    let memeIndex = 0;


    const mappedStories = stories.flatMap((story, index) => {

        const date = new Date(story.created_at);

        const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()} at ${(date.getHours() > 12) ? date.getHours() - 12 : date.getHours()}:${(date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())} ${(date.getHours() > 12) ? 'PM' : 'AM'}`;

        function getRandomColor() {
            const letters = '89ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 8)];
            }
            return color;
        }

        const backgroundColor = getRandomColor();

        const storyCard = (
            <div class='individual-card' style={{ backgroundColor }}>                
                <p key={story.id}>{story.story}</p>
                <p>⬡</p>
                <p>Likes: {story.likes}</p>
                <button className="like-button" onClick={(e) => handleLike(story, e)}>Like</button>
            </div>
        );

        if (index % 4 === 3) {
            const memeCard = (
                <div class='card individual-card text-center'>
                <img src={storyMemes[index]} key={storyMemes[index]} alt="Meme" style={{width:'100%'}}/>
                </div>
            );
            return [storyCard, memeCard];
        } else {
            return storyCard;
        }
    })

    return (
        <div className="posts-container">
            {mappedStories}
        </div>
    );
}

export default Posts;