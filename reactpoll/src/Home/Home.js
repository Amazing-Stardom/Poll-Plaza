
import { Sidebar } from "./Sidebar.js";
import { Table } from "./PollTable.js";
import  '../App.css';
import { ThingsProvider } from './ThingsContext.js'
import { useState } from "react";
const Home = props => {
  const [selectedTags, setSelectedTags] = useState([])
  
  const [ClickedTag, setClickedTag] =useState([])
    return (
    <ThingsProvider value={{selectedTags,setSelectedTags,ClickedTag, setClickedTag}}>
      <div class="create-flex-box">
         <Sidebar />
         
        <Table />
        </div>
        
        </ThingsProvider>
    );
  }
export default Home
  