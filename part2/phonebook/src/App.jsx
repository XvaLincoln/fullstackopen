import {useState, useEffect} from "react"
import personService from "./services/persons"; 
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm.jsx" 
import Filter from "./components/Filter.jsx"
import Notification from "./Notification.jsx" 
import './index.css'
import Footer from "./components/Footer.jsx";

const App = () => { 
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('') 
    const [newNumber, setNewNumber] = useState('') 
    const [filter, setFilter] = useState('') 
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => { 
        personService 
            .getAll() 
            .then(initialPersons => { 
                setPersons(initialPersons) 
            }) 
            .catch(error => {
                console.error("Failed to fetch persons:", error);
            });
    }, []) 

    const addPerson = (event) => { 
        event.preventDefault(); 

        const existingPerson = persons.find(p => p.name === newName);

        const personObject = { 
            name: newName, 
            number: newNumber, 
        } 
        if (existingPerson) {
            const confirmUpdate = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )
            if (!confirmUpdate) {
                return
            }
                personService
                .update(existingPerson.id, personObject) 
                .then(updatedPerson => {
                    setPersons(
                        persons.map(p => 
                            p.id !== existingPerson.id ? p : updatedPerson))
                    setNewName('')
                    setNewNumber('')
                    setErrorMessage(`Updated ${updatedPerson.name}`)
                    setTimeout(() => setErrorMessage(null), 5000)
                })
                .catch(error => {  
                    setErrorMessage(`Information of '${newName}' was already removed from server`)
                    setTimeout(() => setErrorMessage(null), 5000)
                    setPersons(persons.filter(p => p.id !== existingPerson.id))
                })
                return 
            } 

            personService.create(personObject).then(returnedPerson => { 
            setPersons(persons.concat(returnedPerson)) 
            setNewName('') 
            setNewNumber('') 

            setErrorMessage(`Added ${returnedPerson.name}`) 
            setTimeout(() => { 
                setErrorMessage(null) 
            }, 5000)
        })
        .catch(error => {
            console.error("Failed to create person:", error);
    }) 
    }

    const handleDelete = (id, name) => { 
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id).then(() => {
                setPersons(persons.filter(p => p.id !== id))
            })
            .catch(error => {
                setErrorMessage(`The person '${name}' was already removed from server`)
                setTimeout(() => { 
                    setErrorMessage(null) 
                }, 5000) 
                setPersons(persons.filter(p => p.id !== id))
            })
        }
    }   

    const personsToShow = filter === ''
        ? persons
        : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())
    );

        return (
          <div> 
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <Filter filter={filter} handleFilterChange={(e) => setFilter(e.target.value)} /> 
            <h3>Add a new</h3>
            <PersonForm 
                addPerson={addPerson} 
                newName={newName} 
                handleNameChange={(e) => setNewName(e.target.value)} 
                newNumber={newNumber} 
                handleNumberChange={(e) => setNewNumber(e.target.value)} 
            /> 
            <h3>Numbers</h3>    
            <Persons persons={personsToShow} handleDelete={handleDelete} />
            <Footer />
        </div> 
    ) 
}

export default App 