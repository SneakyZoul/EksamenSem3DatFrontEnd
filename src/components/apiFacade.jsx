const URL = "https://www.sneakyzoul.com/boats";

async function handleHttpErrors(res) {

    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: await res.json()})
    }
    return res.json();
}

function apiFacade() {
    /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () => {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {
        const options = makeOptions("POST", true, {username: user, password: password});
        return fetch(URL + "/auth/login", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }


    const fetchData = () => {
        const options = makeOptions("GET", true); //True add's the token
        return fetch(URL + "/info/user", options).then(handleHttpErrors);
    }
    const makeOptions = (method, addToken, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    const fetchGuest = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/guest/all", options).then(handleHttpErrors);
    }
    //fetch all shows
    const fetchShows = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/show/all", options).then(handleHttpErrors);
    }
    //fecth specfic show
    const fetchWhatShow = (id) => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/guest/shows/"+ id, options)
    }
    //guest signup
    const signUp = (guestID,showID) =>{
        const options = makeOptions("POST", true);
        return fetch(URL + "/guest/signup/"+ guestID +"/"+showID,options);
    }
    //Admin delete
    const deleteShow=(id)=>{
        const options = makeOptions("DELETE",true);
        return fetch(URL +"/show/delete" +id,options)
    }


    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        fetchGuest,
        fetchShows,
        fetchWhatShow,
        deleteShow,
        signUp
    }
}

const facade = apiFacade();
export default facade