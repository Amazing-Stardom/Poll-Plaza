// FilterTags.js
import './Style.css';
import React, { useEffect, useState, useContext } from "react";
import ThingsContext from './ThingsContext';
import Button from '@mui/material/Button';

const FilterTags = props => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTags, setSelectedTags ]=useState([]);
    const [Message, setMessage] = useState([])
    const { setClickedTag} = useContext(ThingsContext);


console.log(selectedTags)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/polls/fetch_tags/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setTags(jsonData.Tags);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTagChange = (event) => {
        const tagName = event.target.value;
        if (event.target.checked) {
            setSelectedTags(prevSelectedTags => [...prevSelectedTags, tagName]);
        } else {
            setSelectedTags(prevSelectedTags => prevSelectedTags.filter(tag => tag !== tagName));
        }
    };

    const handleSubmit = async () => {
        try {
          let message;
          let Tags;
      
          if (selectedTags.length === 0) {
            // If selectedTags is empty
            //is fetch all
            //is filtered
            Tags = [];
            setClickedTag(Tags); // Set ClickedTag directly to an empty array
          } else {
            // If selectedTags is not empty
            Tags = selectedTags.join(',');
            setClickedTag(Tags);
            
          }
      
          // Set the message in the context
          setMessage([message]);
      
          // Logging for debugging
          console.log(Message);
          if (Tags) {
            console.log(Tags);
          }
      
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
    
      
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {Array.isArray(tags) && tags.map(tag => (
                <div key={tag} className="Option">
                    <input type="checkbox" value={tag} onChange={handleTagChange} className="Check-mark"/>
                    <label>{tag}</label><br/>
                </div>
            ))}
            <Button color="secondary" 
                    disabled={false} 
                    size="small" 
                    variant="contained" 
                    style={{marginTop:'10px',
                            marginLeft:"14px",marginBottom:"10px"}}
                    onClick={handleSubmit}>
                Filter by Tags
            </Button>
            <br/>
        </div>
    );
}

export default FilterTags;
