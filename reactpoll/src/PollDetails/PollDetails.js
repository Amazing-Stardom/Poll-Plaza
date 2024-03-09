// PollDetails.js

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Tags from "./Tags";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chart } from "react-google-charts";

function PollDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [polldata, setPolldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/polls/fetch_polls/id=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setPolldata(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="poll-details-container">
            <div className="poll-details-table-pie">
                <div className="poll-details-table">
                    <div className="poll-title">
                        <b>{polldata[0].Question}</b>
                    </div>
                    <TableContainer component={Paper} style={{borderRadius:"10px"}}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell style={{ width: '10%' }}>Number</TableCell> {/* Adjust width as needed */}
                <TableCell>Option</TableCell>
                <TableCell style={{ width: '20%' }}>Votes</TableCell> {/* Adjust width as needed */}
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.entries(polldata[0].OptionVote).map(([option, votes], index) => (
                <TableRow key={index}>
                    <TableCell style={{ width: '10%' }}>{index + 1}</TableCell> {/* Adjust width as needed */}
                    <TableCell>{option}</TableCell>
                    <TableCell style={{ width: '20%' }}>{votes}</TableCell> {/* Adjust width as needed */}
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>

                    {/* <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Option</TableCell>
                                    <TableCell>Votes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(polldata[0].OptionVote).map(([option, votes], index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{option}</TableCell>
                                        <TableCell>{votes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                    <Tags tags={polldata[0].Tags} />
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/Vote?id=${id}`, { state: { polldata } })}
                        >
                            Vote on this Poll
                        </Button>
                    </div>
                </div>
                <div className="poll-details-pie">
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Option', 'Votes'],
                            ...Object.entries(polldata[0].OptionVote)
                        ]}
                        options={{
                            title: 'Poll Results',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PollDetails;

// // PollDetails.js

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import Tags from "./Tags";
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { Chart } from "react-google-charts";
// //import { PieChart, Pie, Legend, Tooltip } from 'recharts';

// function PollDetails() {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get('id');
//     const [polldata, setPolldata] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/polls/fetch_polls/id=${id}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const jsonData = await response.json();
//                 setPolldata(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="poll-details-container">
//             <div className="poll-details-table-pie">
//                 <div className="poll-details-table">
//                     <div className="poll-title">
//                         <b>{polldata[0].Question}</b>
//                     </div>
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Number</TableCell>
//                                     <TableCell>Option</TableCell>
//                                     <TableCell>Votes</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {Object.entries(polldata[0].OptionVote).map(([option, votes], index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{index + 1}</TableCell>
//                                         <TableCell>{option}</TableCell>
//                                         <TableCell>{votes}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <Tags tags={polldata[0].Tags} />
//                     <div>
//                         <Button
//                             variant="contained"
//                             onClick={() => navigate(`/Vote?id=${id}`, { state: { polldata } })}
//                         >
//                             Vote on this Poll
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="poll-details-pie">
//                         <Chart
//                             chartType="PieChart"
//                             data={polldata[0].OptionVote}
//                             options={options}
//                             width={"100%"}
//                             height={"400px"}
//                         />
                        
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PollDetails;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import Tags from "./Tags";
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { PieChart, Pie, Cell } from 'recharts';

// function PollDetails() {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get('id');
//     console.log('ID from URL:', id);
//     const [polldata, setPolldata] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/polls/fetch_polls/id=${id}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const jsonData = await response.json();
//                 setPolldata(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const StyledTableCell = TableCell;
//     const StyledTableRow = TableRow;

//     return (
//         <div className="poll-details">
//             <div className="poll-title">
//                 <b>{polldata[0].Question}</b>
//             </div>
//             <div className="poll-details-table-pie"
//             <div>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Number</StyledTableCell>
//                             <StyledTableCell style={{ width: '50%' }}>Option</StyledTableCell>
//                             <StyledTableCell>Votes</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {Object.entries(polldata[0].OptionVote).map(([option, votes], index) => (
//                             <StyledTableRow key={index}>
//                                 <StyledTableCell>{index + 1}</StyledTableCell>
//                                 <StyledTableCell>{option}</StyledTableCell>
//                                 <StyledTableCell>{votes}</StyledTableCell>
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             </div>
            
//             <div>
//             <PieChart width={700} height={700}>
//                 <Pie
//                     data={Object.entries(polldata[0].OptionVote).map(([option, votes]) => ({ name: option, value: votes }))}
//                     dataKey="value"
//                     outerRadius={250}
//                     fill="#8884d8"
//                 >
//                     {Object.entries(polldata[0].OptionVote).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
//                     ))}
//                 </Pie>
//             </PieChart>
//             </div>
//             </div>
//             <Tags tags={polldata[0].Tags} />
//             <div>
//                 <Button
//                     variant="contained"
//                     onClick={() => navigate(`/Vote?id=${id}`, { state: { polldata } })}
//                 >
//                     Vote on this Poll
//                 </Button>
//                 <br/>
//             </div>
//         </div>
//     );
// }

// export default PollDetails;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import Tags from "./Tags";
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';

// function PollDetails() {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get('id');
//     console.log('ID from URL:', id);
//     const [polldata, setPolldata] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/polls/fetch_polls/id=${id}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const jsonData = await response.json();
//                 setPolldata(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const StyledTableCell = TableCell;
//     const StyledTableRow = TableRow;

//     return (
//         <div className="poll-details">
//             <div className="poll-title">
//                 <b>{polldata[0].Question}</b>
//             </div>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Number</StyledTableCell>
//                             <StyledTableCell style={{ width: '50%' }}>Option</StyledTableCell>
//                             <StyledTableCell>Votes</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {Object.entries(polldata[0].OptionVote).map(([option, votes], index) => (
//                             <StyledTableRow key={index}>
//                                 <StyledTableCell>{index + 1}</StyledTableCell>
//                                 <StyledTableCell>{option}</StyledTableCell>
//                                 <StyledTableCell>{votes}</StyledTableCell>
//                             </StyledTableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Tags tags={polldata[0].Tags} />
//             <div>
//                 <Button
//                     variant="contained"
//                     onClick={() => navigate(`/Vote?id=${id}`, { state: { polldata } })}
//                 >
//                     Vote on this Poll
//                 </Button>
//                 <br/>
//             </div>
//         </div>
//     );
// }

// export default PollDetails;

// // import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import Tags from "./Tags";
// import Button from '@mui/material/Button';
// //from here 
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// //till MUI Table
// function PollDetails() {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get('id');
//     console.log('ID from URL:', id);
//     const [polldata, setPolldata] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     //from here 
//     const StyledTableCell = styled(TableCell)(({ theme }) => ({
//         [`&.${tableCellClasses.head}`]: {
//           backgroundColor: theme.palette.common.black,
//           color: theme.palette.common.white,
//         },
//         [`&.${tableCellClasses.body}`]: {
//           fontSize: 14,
//         },
//       }));
      
//       const StyledTableRow = styled(TableRow)(({ theme }) => ({
//         '&:nth-of-type(odd)': {
//           backgroundColor: theme.palette.action.hover,
//         },
//         // hide last border
//         '&:last-child td, &:last-child th': {
//           border: 0,
//         },
//       }));
      
//       function createData(
        
//       ) {
//         return {  };
//       }
      
      
      
//       //till here MUI table
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/polls/fetch_polls/id=${id}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const jsonData = await response.json();
//                 setPolldata(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="poll-details">
//             <div className="poll-title">
//                 <b>{polldata[0].Question}</b>
//             </div>
//             <div className="polltable">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Number</th>
//                             <th style={{ width: '50%' }}>Option</th>
//                             <th>Votes</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Object.entries(polldata[0].OptionVote).map(([option, votes], index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{option}</td>
//                                 <td>{votes}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <Tags tags={polldata[0].Tags} />
//             <div>
//                 <Button
//                     variant="contained"
//                     onClick={() => navigate(`/Vote?id=${id}`, { state: { polldata } })}
//                 >
//                     Vote on this Poll
//                 </Button>
//                 <br/>
//             </div>
//         </div>
//     );
// }

// export default PollDetails;


// export default function CustomizedTables() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell></StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//             <StyledTableCell align="right"></StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right"></StyledTableCell>
//               <StyledTableCell align="right"></StyledTableCell>
//               <StyledTableCell align="right"></StyledTableCell>
//               <StyledTableCell align="right"></StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }