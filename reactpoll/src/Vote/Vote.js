import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
function Vote() {
    const location = useLocation();
    const { polldata } = location.state;
    const [selectedOption, setSelectedOption] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOptionChange = (event) => {
        const clickedOption = event.target.value;
        setSelectedOption(prevSelectedOption => {
            // Toggle selection if the clicked option is already selected
            return prevSelectedOption === clickedOption ? null : clickedOption;
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/polls/update_choice/${polldata[0].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ incrementOption: selectedOption })            
            });
    
            if (response.ok) {
                // Redirect to the home page after successful submission
                window.location.href = "http://localhost:3000/";
            } else {
                alert('Check wheaather You have clicked');
                setErrorMessage('Check wheaather You have clicked');
            }
    
            // Handle success response here, e.g., display a message to the user
            console.log('Vote submitted successfully');
        } catch (error) {
            console.error('Error submitting vote:', error);
            // Handle error here, e.g., display an error message to the user
        }
    };

    return (
        <div className="Vote-Selection">
            <div className="Vote-Title">
                <b>{polldata[0].Question}</b>
            </div>
                {Object.entries(polldata[0].OptionVote).map(([option, votes]) => (
                    <div key={option} className="Option-Vote">
                        <input
                            type="radio"
                            name="Vote-Option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor={`Vote-Option-${option}`}>{option}</label><br/>
                    </div>
                ))}
                <Button variant="contained"
                        size="small"
                        onClick={handleSubmit}
                        style={{marginTop:"10px"}}>Vote</Button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default Vote;
