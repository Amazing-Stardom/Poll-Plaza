import './Style.css'
import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
function VoteButton() {
  return (
    <div>
    <Link to={`/Vote`}>
        <Button variant="contained">
            Vote on this Poll
        </Button>
    </Link>
    <br/>
</div>
  )
}

export default VoteButton