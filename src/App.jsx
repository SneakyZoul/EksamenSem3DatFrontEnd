import React, {useState, useEffect} from "react"
import facade from "./components/apiFacade";
import LoggedIn from "./components/LoggedIn";
import LogIn from "./components/LogIn";


function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
    }
    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setLoggedIn(true));
    }

    const getShows = () =>{
        facade.fetchShows()
            .then()
    }


    return (
        <>


            {!loggedIn ? (<LogIn login={login}/>) :
                (<div>
                    <LoggedIn/>
                    <br/>
                    <br/>
                    <button onClick={logout}>Logout</button>
                    <br/>
                    <br/>
                </div>)}
        </>
    )
}

export default App;
