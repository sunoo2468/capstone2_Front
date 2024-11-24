// src/components/Feedback.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Feedback.css';

function Feedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { feedback: newFeedback, date: new Date().toLocaleDateString() };
        setFeedbackList([...feedbackList, newEntry]);
        setNewFeedback('');
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content">
                <h1>Feedback</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Leave your feedback here..."
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {feedbackList.map((feedback, index) => (
                        <li key={index}>
                            <strong>{feedback.date}</strong>: {feedback.feedback}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Feedback;
