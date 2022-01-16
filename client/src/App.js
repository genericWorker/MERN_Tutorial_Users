import './App.css';
// useEffect causes function to run when website is loaded
import {useState, useEffect } from "react"; 
import Axios from "axios";


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0); 
  const [userName, setUserName] = useState("");
  // array to hold users
 // const[listOfUsers, setListOfUsers] = useState([{}]); 
  const[listOfUsers, setUserList] = useState([]);  //[{}]);
 // {id: 1, name: "Pedro", age: 20, userName: "pedro123"},
// ]); 
   // this runs at startup
  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setUserList(response.data); 
    }).catch((err) => {
      console.log('problem with getUsers..', err);
    }); 
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name,
      age, 
      userName, 
      }).then((response) => {
        console.log("User created"); 
        setUserList([...listOfUsers, { 
          name,
          age, 
          userName,
        },
      ]); 
    });
 }; 

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div> 
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.userName}</h1>
             </div>
          ); 
        
          })}
         
      </div>
      <div>
        <input type="text" 
        placeholder="Name..." 
        onChange={(event) => {
          setName(event.target.value);
        }} />
        <input type="number" 
        placeholder="Age..."
        onChange={(event) => {
          setAge(event.target.value);
        }} />
        <input type="text"
         placeholder="Username..."
         onChange={(event) => {
          setUserName(event.target.value);
        }}
        />
        <button onClick={createUser}> Create User</button>
      </div>
    </div>
  );
}

export default App;
