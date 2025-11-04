const Filter = ({filter, handleFilterChange}) => (
        <div> 
            filter shown with 
            <input
            id ="filter"                            // unique id 
            name="filter"                           // important for forms & autofill
            value={filter} 
            onChange={handleFilterChange} 
            /> 
        </div> 
    );
export default Filter 