const Person = ({ person, handleDelete }) => { 
    return ( 
        <li> className="person" 
            {person.name} {person.number} 
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button> 
        </li> 
    ); 
} 
export default Person