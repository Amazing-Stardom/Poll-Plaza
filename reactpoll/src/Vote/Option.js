import './Style.css';
import React from 'react'
import { Link } from 'react-router-dom';
function Votebutton() {
    return(
        <div>
        <Link to="/"><button id="Vote-botton">Vote</button>
        </Link>
        <br/>
        </div>
        );
}
function Option() {
  return (
    <div>
    <input id ="Vote-Option" type="radio" />
    <label>Yes</label><br/>
    <input id ="Vote-Option" type="radio" />
    <label>No</label><br/>
    <Votebutton />
    </div>
    )
}

export default Option