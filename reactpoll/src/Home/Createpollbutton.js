import '../App.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
export function Create(){
    return(
  //     <Link to="/CreatePoll" >
  //       <Button variant="contained"
  //        color="primary" 
  //        disabled={false} 
  //        size="large" 
  //        style={{
  //                 borderRadius:"10px"
  //                 }}>Create Poll</Button>
  // </Link>
  <Link to="/CreatePoll">
    <Button 
        variant="contained"
        color="primary" 
        disabled={false} 
        size="large" 
        style={{
            borderRadius: "10px",
            width: "200px", // Set the width to 200px
            minWidth: "200px", // Ensure the button does not shrink below 200px
            maxWidth: "200px",
            fontSize:"15px",
            fontWeight: "bold"// Ensure the button does not grow above 200px
        }}
    >
        Create Poll
    </Button>
</Link>

    );
}
// {/* <button class="Create">
//       Create Poll
//     </button> */}