import { useEffect, useState } from "react";

function Posts({ stories }) {

    console.log(stories)

    const mappedStories = stories.map(story => {

        // Create a new Date object from the story's created_at string
        const date = new Date(story.created_at);

        // Format the date into the desired format
        const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()} at ${(date.getHours() > 12) ? date.getHours() - 12 : date.getHours()}:${(date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())} ${(date.getHours() > 12) ? 'PM' : 'AM'}`;

        return (
            <div class='card' className="individual-card text-center">
                <h3 class="card-body" className="text-center" key={story.id}>{story.content}</h3>
                <br></br>
                <p className="text-center">Posted on {formattedDate}</p>
                <button className="like-button">Like</button>
            </div>
        )
    })

    return (
        <div>
            {mappedStories}
        </div>
    );
}

export default Posts;