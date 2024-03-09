import '../App.css'
import React from 'react'
import PollDetails from './PollDetails.js'
function OptionTable() {
  return (
    <div class="polltable"><table>
            <tr>
                <th>Number</th>
                <th>Option</th>
                <th>Votes</th>
            </tr>
            {polldata.map(({ id, Question, OptionVote, Tags }, index) => (
            <tr>
                <td>1</td>
                <td>Yes, India will win the next ICC World cup</td>
                <td>22</td>
            </tr>
            <tr>
                <td>2</td>
                <td>India won't win the next ICC world cup</td>
                <td>10</td>
            </tr>
            ))}
        </table>
        </div>
  )
}

export default OptionTable