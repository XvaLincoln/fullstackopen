  const Hello = (props) => { 
    return (
      <div> 
        <p> Hello {props.name}, you are {props.age}</p>
      </div>
    )
  } 
  
const App = () => {
  const friends = [
    { name: 'Thapelo', age: 26 },
    { name: 'John', age: 30 },
    { name: 'Jane', age: 20 },
  ]
  return (
  <div> 
   <h1>Greetings</h1>
   <Hello name = 'Thapelo' age = {26+10} />
   <Hello name = 'John' age = {30 + 5} />
   <Hello name = 'Jane' age = {20 + 3}/>
  </div>
) 
} 
      export default App