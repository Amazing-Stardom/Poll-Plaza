import React, { useContext, useEffect, useState } from "react";
import './Style.css';
import { Link } from 'react-router-dom';
import ThingsContext from './ThingsContext';
import { styled } from '@mui/material/styles';
import MuiTable from '@mui/material/Table'; // Renamed MUI Table component
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#cccccc', // Set background color
    color: 'black', // Set text color
    border: '1px solid #8f8f8f', // Set border color
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'black', // Set text color
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export function Table() {
  const { ClickedTag } = useContext(ThingsContext);
  const [polldata, setPolldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (Array.isArray(ClickedTag) && ClickedTag.length === 0) {
          response = await fetch('http://127.0.0.1:8000/polls/fetch_polls');
        } else {
          response = await fetch(`http://127.0.0.1:8000/polls/filter_tag?tags=${ClickedTag}`);
          console.log('Message received from FilterTags');
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setPolldata(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [ClickedTag]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <TableContainer component={Paper} style={{borderRadius:"10px"}}>
        <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell align="left">Question</StyledTableCell>
              <StyledTableCell align="left" style={{ width: '10%', whiteSpace: 'nowrap' }}>Total Votes</StyledTableCell>
              <StyledTableCell align="left">Tags</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {polldata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ id, Question, OptionVote, Tags }, index) => (
                <StyledTableRow key={id}>
                  <StyledTableCell align="left" style={{ width: '5%', whiteSpace: 'nowrap' }}>{index + 1}</StyledTableCell>
                  <StyledTableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`/PollDetails?id=${id}`}>{Question}</Link>
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ whiteSpace: 'nowrap' }}>{Object.values(OptionVote).reduce((a, b) => a + b, 0)}</StyledTableCell>
                  <StyledTableCell align="left" style={{ width: '10%', whiteSpace: 'nowrap' }}>{Tags.join(', ')}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={polldata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}


// import React, { useContext, useEffect, useState } from "react";
// import './Style.css';
// import { Link } from 'react-router-dom';
// import ThingsContext from './ThingsContext';
// import { styled } from '@mui/material/styles';
// import MuiTable from '@mui/material/Table'; // Renamed MUI Table component
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: '#cccccc', // Set background color
//     color: 'black', // Set text color
//     border: '1px solid #8f8f8f', // Set border color
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     color: 'black', // Set text color
//   },
// }));
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // Remove border for last row's cells
//   '&:last-child td, &:last-child th': {
    
//   },
// }));
// // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// //   '&:nth-of-type(odd)': {
// //     backgroundColor: theme.palette.action.hover,
// //   },
// //   // hide last border
// //   '&:last-child td, &:last-child th': {
// //     border: 0,
// //   },
// // }));

// export function Table() { // Renamed original table component to PollTable
//   const { ClickedTag } = useContext(ThingsContext);
//   const [polldata, setPolldata] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response;
//         if (Array.isArray(ClickedTag) && ClickedTag.length === 0) {
//           response = await fetch('http://127.0.0.1:8000/polls/fetch_polls');
//         } else {
//           response = await fetch(`http://127.0.0.1:8000/polls/filter_tag?tags=${ClickedTag}`);
//           console.log('Message received from FilterTags');
//         }

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const jsonData = await response.json();
//         setPolldata(jsonData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [ClickedTag]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="main-content">
//       <TableContainer component={Paper}>
//         <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Number</StyledTableCell>
//               <StyledTableCell  align="left">Question</StyledTableCell>
//               <StyledTableCell align="left" style={{  width: '10%' ,whiteSpace: 'nowrap' }}>Total Votes</StyledTableCell>
//               <StyledTableCell align="left">Tags</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {polldata.map(({ id, Question, OptionVote, Tags }, index) => (
//               <StyledTableRow key={id}>
//                 <StyledTableCell align="left" style={{ width: '5%', whiteSpace: 'nowrap' }}>{index + 1}</StyledTableCell>
//                 <StyledTableCell align="left" style={{ whiteSpace: 'nowrap' }}>
//                   <Link to={`/PollDetails?id=${id}`}>{Question}</Link>
//                 </StyledTableCell>
//                 <StyledTableCell align="left" style={{  whiteSpace: 'nowrap' }}>{Object.values(OptionVote).reduce((a, b) => a + b, 0)}</StyledTableCell>
//                 <StyledTableCell align="left" style={{ width: '10%', whiteSpace: 'nowrap' }}>{Tags.join(', ')}</StyledTableCell>

//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </MuiTable>
//       </TableContainer>
//     </div>
//   );
// }


// // PollTable.js
// import React, { useContext, useEffect, useState } from "react";
// import './Style.css';
// import { Link } from 'react-router-dom';
// import ThingsContext from './ThingsContext';

// export function Table() {
//   const {ClickedTag } = useContext(ThingsContext);
//   const [polldata, setPolldata] = useState([]);
//   const [loading, setLoading] = useState(true);
  
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response;//if clickedTag
//         if (Array.isArray(ClickedTag) && ClickedTag.length === 0) {
//           response = await fetch('http://127.0.0.1:8000/polls/fetch_polls');
//       } else {
//           response = await fetch(`http://127.0.0.1:8000/polls/filter_tag?tags=${ClickedTag}`);
//           console.log('Message received from FilterTags');
//       }
      
  
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
  
//         const jsonData = await response.json();
//         setPolldata(jsonData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false); // Make sure to set loading to false even in case of error
//       }
//     };
  
//     fetchData();
//   }, [ClickedTag]); // Include selectedTags and Messege in dependency array
  
//   // Include selectedTags and Messege in dependency array to trigger useEffect on change

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     //orginal table 
//     <div className="main-content">
//       <table>
//         <thead>
//           <tr>
//             <th>Number</th>
//             <th id="Question" style={{ width: '75%' }}>Question</th>
//             <th>Total Votes</th>
//             <th>Tags</th>
//           </tr>
//         </thead>
//         <tbody>
//           {polldata.map(({ id, Question, OptionVote, Tags }, index) => (
//             <tr key={id}>
//               <td>{index + 1}</td>
//               <td><Link to={`/PollDetails?id=${id}`}>{Question}</Link></td>
//               <td>{Object.values(OptionVote).reduce((a, b) => a + b, 0)}</td>
//               <td>{Tags.join(', ')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// //MUI Table
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(
 
// ) {
//   return {  };
// }

// const rows = [
 
// ];

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
