import  FilterTags  from './Filter.js';
import { Create } from './Createpollbutton.js';
export function Sidebar(){
// const ThingsProvider = useContext(selectedTags, setSelectedTags );
    return(
        <div class="sidebar">
            <div class="Create-button-home">
           <Create />
           </div>
           <div class="tag-container">
                <FilterTags />
            </div>
        </div>
    );
  }