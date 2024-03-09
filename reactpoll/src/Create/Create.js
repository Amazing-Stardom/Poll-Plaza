import '../App.css';
import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function CreatePoll() {
    const [Question, setQuestion] = useState("");
    const [OptionVote, setOptionVote] = useState({ "Option 1": "", "Option 2": "" });
    console.log(OptionVote);
    const [Tags, setTags] = useState("");
    const handleAddOption = useCallback(() => {
        setOptionVote(prevOptionVote => {
            const optionCount = Object.keys(prevOptionVote).length + 1;
            const newOptionKey = `Option ${optionCount}`;
            return {
                ...prevOptionVote,
                [newOptionKey]: '' // Initialize the new option with an empty string
            };
        });
    }, []);
    
    // const handleAddOption = useCallback(() => {
    //     setOptionVote(prevOptionVote => {
    //         const optionCount = Object.keys(prevOptionVote).length + 1;
    //         const newOptionKey = `Option ${optionCount}`;
    //         return {
    //             ...prevOptionVote,
    //             [newOptionKey]: '' // Initialize the new option with an empty string
    //         };
    //     });
    // }, []);
    
    // const handleAddOption = useCallback(() => {
    //     setOptionVote(prevOptionVote => {
    //         const optionCount = Object.keys(prevOptionVote).length + 1;
    //         const newOptionKey = `Option ${optionCount}`;
    //         return {
    //             ...prevOptionVote,
    //             [newOptionKey]: ''
    //         };
    //     });
    // }, []);
    const handleDeleteLastOption = (optionToDelete) => {
        setOptionVote(prevOptionVote => {
            const updatedOptionVote = { ...prevOptionVote };
            delete updatedOptionVote[optionToDelete];
            
            // Re-index the remaining options to maintain sequential order
            const reIndexedOptions = Object.keys(updatedOptionVote).reduce((acc, key, index) => {
                acc[`Option ${index + 1}`] = updatedOptionVote[key];
                return acc;
            }, {});
    
            return reIndexedOptions;
        });
    };
    
    
    // const handleDeleteLastOption = () => {
    //     setOptionVote(prevOptionVote => {
    //         const updatedOptionVote = { ...prevOptionVote };
    //         const lastOptionKey = Object.keys(updatedOptionVote).pop();
    //         if (lastOptionKey) {
    //             delete updatedOptionVote[lastOptionKey];
    //         }
    //         return updatedOptionVote;
    //     });
    // };

    // const handleDeleteAllOptions = () => {
    //     setOptionVote({});
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if Question, OptionVote, and Tags are not empty
        if (
            Question.trim() === '' ||
            Object.values(OptionVote).some((option) => option.trim() === '') ||
            Object.keys(OptionVote).length < 2 || // Minimum 2 options required
            Tags.trim() === ''
        ) {
            alert('Please fill in all fields and provide at least 2 options.');
            return;
        }

        try {
            const formData = {
                Question: Question,
                OptionVote: OptionVote,
                Tags: Tags.split(',').map((tag) => tag.trim()),
            };

            const formattedOptionVote = {};
            Object.keys(OptionVote).forEach((option) => {
                formattedOptionVote[OptionVote[option]] = "0";
            });
            formData.OptionVote = formattedOptionVote;

            const response = await fetch('http://127.0.0.1:8000/polls/create_poll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.location.href = 'http://localhost:3000/';
            } else {
                alert('Failed to create poll. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred');
        }
    };

    return (
        <div className="flex-box">
            <div id="Form" className="Form">
                <div class="form-div">
                <b>
                    <label htmlFor="Question">
                        Question
                    </label>
                </b>
                <br />
                <input
                    type="text"
                    id="Input-data"
                    name="Question"
                    placeholder="Type your poll question here"
                    value={Question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <br />
                </div>
                <div class="form-div">
                <b>
                    <label  htmlFor="Answer">
                        Options
                    </label>
                </b>
                <br />
                {Object.entries(OptionVote).map(([option, value], index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
        <input
            type="text"
            id="Input-data"
            placeholder={`${option}`}
            value={value}
            onChange={(e) =>
                setOptionVote((prevOptionVote) => ({
                    ...prevOptionVote,
                    [option]: e.target.value,
                }))
            }
        />
        {Object.keys(OptionVote).length >= 3 && (
            <svg 
                onClick={() => handleDeleteLastOption(option)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24"
            >
                <path fill="#5f6368" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
        )}
    </div>
))}

                {/* {Object.entries(OptionVote).map(([option, value], index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center'}}>
        <input
            type="text"
            id="Input-data"
            placeholder={`${option}`}
            value={value}
            onChange={(e) =>
                setOptionVote((prevOptionVote) => ({
                    ...prevOptionVote,
                    [option]: e.target.value,
                }))
            }
        />
        <svg 
            onClick={() => handleDeleteLastOption(option)}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24"
        >
            <path fill="#5f6368" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
    </div>
))} */}

                {/* {Object.entries(OptionVote).map(([option, value]) => (
                    <input
                        key={option}
                        type="text"
                        id="Input-data"
                        placeholder={`${option}`}
                        value={value}
                        onChange={(e) =>
                            setOptionVote((prevOptionVote) => ({
                                ...prevOptionVote,
                                [option]: e.target.value,
                            }))
                        }
                    />
                ))} */}
                <Stack direction="row" spacing={1} >
                
                
                <Button variant="contained" 
                        color="primary" 
                        className="add-option" 
                        size="small"
                        style={{marginTop:"10px",
                                marginBottom:"5px"}}
                        onClick={handleAddOption}>ADD</Button>
                        

                </Stack>
                
                
                </div>

                <div class="form-div-tag">
                <b>
                    <label  >
                        Comma separated tags
                    </label>
                </b>
                <br />
                

                <input
                    type="text"
                    placeholder="Tag1, Tag2, Tag3"
                    id="Input-data"
                    name="Tags"
                    value={Tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <br />
                </div>
            </div>
            <div class="Create-button">
            <Button size="large" 
                        color="secondary"
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ borderRadius: "10px" }}>
                    Create Poll
                </Button>
                </div>
                
        </div>
    );
}

export default CreatePoll;
// {/* <svg 
//       onClick={handleDeleteLastOption}
//       style={{ margin: "10px" }}
//       xmlns="http://www.w3.org/2000/svg" 
//       width="24" height="24" viewBox="0 0 24 24"
//     >
//       <path fill="#5f6368" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
//       <path d="M0 0h24v24H0z" fill="none"></path>
//     </svg> */}
//                 {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#5f6368" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
//                 <FaTrash onClick={handleDeleteLastOption}
//                 style={{margin:"10px"}} /> */}
//                 {/* <Button 
//                     variant="outlined" 
//                     color="error" 
//                     className="delete-options" 
//                     size="small" 
//                     style={{marginTop:"5px",
//                                 marginBottom:"5px"}}
//                     onClick={handleDeleteLastOption}>
//                     X
//                 </Button> */}
//                 {/* <Button variant="contained" color="error" className="delete-options" size="small" onClick={handleDeleteAllOptions}>
//                     Delete All Options
//                 </Button> */}
// import '../App.css';
// import React, { useState, useCallback } from 'react';
// import Button from '@mui/material/Button';

// function CreatePoll() {
//     const [Question, setQuestion] = useState("");
//     const [OptionVote, setOptionVote] = useState({});
//     const [Tags, setTags] = useState("");

//     const handleAddOption = useCallback(() => {
//         setOptionVote(prevOptionVote => {
//             const optionCount = Object.keys(prevOptionVote).length + 1;
//             const newOptionKey = `Option ${optionCount}`;
//             return {
//                 ...prevOptionVote,
//                 [newOptionKey]: ''
//             };
//         });
//     }, []);

//     const handleDeleteOption = useCallback((optionKey) => {
//         setOptionVote(prevOptionVote => {
//             const newOptionVote = { ...prevOptionVote };
//             delete newOptionVote[optionKey];
//             return newOptionVote;
//         });
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation: Check if Question, OptionVote, and Tags are not empty
//         if (
//             Question.trim() === '' ||
//             Object.values(OptionVote).some((option) => option.trim() === '') ||
//             Object.keys(OptionVote).length < 2 || // Minimum 2 options required
//             Tags.trim() === ''
//         ) {
//             alert('Please fill in all fields and provide at least 2 options.');
//             return;
//         }

//         try {
//             const formData = {
//                 Question: Question,
//                 OptionVote: OptionVote,
//                 Tags: Tags.split(',').map((tag) => tag.trim()),
//             };

//             const formattedOptionVote = {};
//             Object.keys(OptionVote).forEach((option) => {
//                 formattedOptionVote[OptionVote[option]] = "0";
//             });
//             formData.OptionVote = formattedOptionVote;

//             const response = await fetch('http://127.0.0.1:8000/polls/create_poll', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 window.location.href = 'http://localhost:3000/';
//             } else {
//                 alert('Failed to create poll. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An unexpected error occurred');
//         }
//     };

//     return (
//         <div className="flex-box">
//             <div id="Form" className="Form">
//                 <b>
//                     <label id="form-text" htmlFor="Question">
//                         Question
//                     </label>
//                 </b>
//                 <br />
//                 <input
//                     type="text"
//                     id="Input-data"
//                     name="Question"
//                     placeholder="Type your poll question here"
//                     value={Question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                 />
//                 <br />
//                 <b>
//                     <label id="form-text" htmlFor="Answer">
//                         Answer Options{' '}
//                     </label>
//                 </b>
//                 <br />
//                 {Object.entries(OptionVote).map(([option, value]) => (
//                     <div key={option}>
//                         <input
//                             type="text"
//                             id="Input-data"
//                             placeholder={`${option}`}
//                             value={value}
//                             onChange={(e) =>
//                                 setOptionVote((prevOptionVote) => ({
//                                     ...prevOptionVote,
//                                     [option]: e.target.value,
//                                 }))
//                             }
//                         />
//                         <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteOption(option)}>
//                             Delete
//                         </Button>
//                     </div>
//                 ))}
//                 <Button variant="contained" color="secondary" className="add-option" size="small" onClick={handleAddOption}>
//                     Add Option
//                 </Button>
//                 <br />
//                 <b>
//                     <label id="form-text" htmlFor="Answer">
//                         Comma separated tags
//                     </label>
//                 </b>
//                 <br />
//                 <input
//                     type="text"
//                     placeholder="Tag1, Tag2, Tag3"
//                     id="Input-data"
//                     name="Tags"
//                     value={Tags}
//                     onChange={(e) => setTags(e.target.value)}
//                 />
//                 <br />
//                 <Button size="large" variant="contained" onClick={handleSubmit}>
//                     Create Poll
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default CreatePoll;

// import '../App.css';
// import React, { useState, useCallback } from 'react';
// import Button from '@mui/material/Button';

// function CreatePoll() {
//     const [Question, setQuestion] = useState("");
//     const [OptionVote, setOptionVote] = useState({});
//     const [Tags, setTags] = useState("");

//     const handleAddOption = useCallback(() => {
//         setOptionVote(prevOptionVote => {
//             const optionCount = Object.keys(prevOptionVote).length + 1;
//             const newOptionKey = `Option ${optionCount}`;
//             return {
//                 ...prevOptionVote,
//                 [newOptionKey]: ''
//             };
//         });
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation: Check if Question, OptionVote, and Tags are not empty
//         if (
//             Question.trim() === '' ||
//             Object.values(OptionVote).some((option) => option.trim() === '') ||
//             Object.keys(OptionVote).length < 2 || // Minimum 2 options required
//             Tags.trim() === ''
//         ) {
//             alert('Please fill in all fields and provide at least 2 options.');
//             return;
//         }

//         try {
//             const formData = {
//                 Question: Question,
//                 OptionVote: OptionVote,
//                 Tags: Tags.split(',').map((tag) => tag.trim()),
//             };

//             const formattedOptionVote = {};
//             Object.keys(OptionVote).forEach((option) => {
//                 formattedOptionVote[OptionVote[option]] = "0";
//             });
//             formData.OptionVote = formattedOptionVote;

//             const response = await fetch('http://127.0.0.1:8000/polls/create_poll', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 window.location.href = 'http://localhost:3000/';
//             } else {
//                 alert('Failed to create poll. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An unexpected error occurred');
//         }
//     };

//     return (
//         <div className="flex-box">
//             <div id="Form" className="Form">
//                 <b>
//                     <label id="form-text" htmlFor="Question">
//                         Question
//                     </label>
//                 </b>
//                 <br />
//                 <input
//                     type="text"
//                     id="Input-data"
//                     name="Question"
//                     placeholder="Type your poll question here"
//                     value={Question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                 />
//                 <br />
//                 <b>
//                     <label id="form-text" htmlFor="Answer">
//                         Answer Options{' '}
//                     </label>
//                 </b>
//                 <br />
//                 {Object.entries(OptionVote).map(([option, value]) => (
//                     <input
//                         key={option}
//                         type="text"
//                         id="Input-data"
//                         placeholder={`${option}`}
//                         value={value}
//                         onChange={(e) =>
//                             setOptionVote((prevOptionVote) => ({
//                                 ...prevOptionVote,
//                                 [option]: e.target.value,
//                             }))
//                         }
//                     />
//                 ))}
//                 <Button variant="contained" 
//                         color="secondary" 
//                         className="add-option" 
//                         size="small"
//                         onClick={handleAddOption}>
//                     Add Option
//                 </Button>
//                 <br />
//                 <b>
//                     <label id="form-text" htmlFor="Answer">
//                         Comma separated tags
//                     </label>
//                 </b>
//                 <br />
//                 <input
//                     type="text"
//                     placeholder="Tag1, Tag2, Tag3"
//                     id="Input-data"
//                     name="Tags"
//                     value={Tags}
//                     onChange={(e) => setTags(e.target.value)}
//                 />
//                 <br />
//                 <Button size="large" 
//                         variant="contained"
//                         onClick={handleSubmit}>
//                     Create Poll
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default CreatePoll;

// import '../App.css';
// import React, { useState, useCallback } from 'react';
// import Button from '@mui/material/Button';
// function CreatePoll() {
//     const [Question, setQuestion] = useState("");
//     const [OptionVote, setOptionVote] = useState({});
//     const [Tags, setTags] = useState("");

//     const handleAddOption = useCallback(() => {
//         setOptionVote(prevOptionVote => {
//             const optionCount = Object.keys(prevOptionVote).length + 1;
//             const newOptionKey = `Option ${optionCount}`;
//             return {
//                 ...prevOptionVote,
//                 [newOptionKey]: ''
//             };
//         });
//     }, []);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validation: Check if Question, OptionVote, and Tags are not empty
//         if (Question.trim() === '' || Object.values(OptionVote).some(option => option.trim() === '') || Tags.trim() === '') {
//             alert('Please fill in all fields.');
//             return;
//         }
    
//         try {
//             const formData = {
//                 Question: Question,
//                 OptionVote: OptionVote,
//                 Tags: Tags.split(',').map(tag => tag.trim())
//             };
    
//             const formattedOptionVote = {};
//             Object.keys(OptionVote).forEach(option => {
//                 formattedOptionVote[OptionVote[option]] = "0";
//             });
//             formData.OptionVote = formattedOptionVote;
    
//             const response = await fetch('http://127.0.0.1:8000/polls/create_poll', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
    
//             if (response.ok) {
//                 window.location.href = "http://localhost:3000/";
//             } else {
//                 alert('Failed to create poll. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An unexpected error occurred');
//         }
//     };
    
//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         const formData = {
//     //             Question: Question,
//     //             OptionVote: OptionVote,
//     //             Tags: Tags.split(',').map(tag => tag.trim())
//     //         };

//     //         const formattedOptionVote = {};
//     //         Object.keys(OptionVote).forEach(option => {
//     //             formattedOptionVote[OptionVote[option]] = "0";
//     //         });
//     //         formData.OptionVote = formattedOptionVote;

//     //         const response = await fetch('http://127.0.0.1:8000/polls/create_poll', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             },
//     //             body: JSON.stringify(formData)
//     //         });

//     //         if (response.ok) {
//     //             window.location.href = "http://localhost:3000/";
//     //         } else {
//     //             alert('Fill every section');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error:', error);
//     //         alert('An unexpected error occurred');
//     //     }
//     // };

//     return (
//         <div className="flex-box">
//             <div id="Form" className="Form">
//                 <b><label id="form-text" htmlFor="Question">Question</label></b><br />
//                 <input
//                     type="text"
//                     id="Input-data"
//                     name="Question"
//                     placeholder="Type your poll question here"
//                     value={Question}
//                     onChange={e => setQuestion(e.target.value)} /><br />
//                 <b><label id="form-text" htmlFor="Answer">Answer Options </label></b><br />
//                 {Object.entries(OptionVote).map(([option, value]) => (
//                     <input
//                         key={option}
//                         type="text"
//                         id="Input-data"
//                         placeholder={`${option}`}
//                         value={value}
//                         onChange={e => setOptionVote(prevOptionVote => ({
//                             ...prevOptionVote,
//                             [option]: e.target.value
//                         }))} />
//                 ))}
//                 <Button variant="outlined"button className="add-option" onClick={handleAddOption} >Add Option</Button><br />
//                 <b><label id="form-text" htmlFor="Answer">Comma separated tags</label></b><br />
//                 <input
//                     type="text"
//                     placeholder="Tag1, Tag2, Tag3"
//                     id="Input-data"
//                     name="Tags"
//                     value={Tags}
//                     onChange={e => setTags(e.target.value)} /><br />
//                 <Button size="small"
//                         variant="contained" 
//                         onClick={handleSubmit}>
//                             Create Poll
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default CreatePoll;
