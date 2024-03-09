import Home from './Home/Home'
import './App.css';
import Heading from './Heading.js'
import Vote from './Vote/Vote.js';
import PollDetails from './PollDetails/PollDetails.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from './Create/Create.js';
export default function MyApp() {
  return (
    <div>
      <div>
        <Heading />
      </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/vote" element={<Vote />} />
      <Route path="/PollDetails" element={<PollDetails />} />
      <Route path="/CreatePoll" element={<CreatePoll />} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

