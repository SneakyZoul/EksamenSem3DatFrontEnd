import React, {useState, useEffect} from "react"
import facade from "./apiFacade"
import {useParams} from "react-router-dom";

function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState()
    const [guest, setGuest] = useState();
    const [show, setShows] = useState();
    const [whatShow, setWhatShow] = useState();
    const [seeShows, setSeeShows] = useState([]);
    const [delteShow, setDeleteShow] = useState();
    const [signUp, setSigUp] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        facade.fetchData().then(data => setDataFromServer(data.msg));
    }, [])


    useEffect(() => {
        facade.fetchGuest().then(data => setGuest(data.map((ex) => (
            <p key={ex.key}>{ex.name},{ex.email},{ex.phone}</p>
        ))));
    }, [])


    useEffect(() => {
        facade.fetchShows().then(data => setShows(data.map((e) => (
            <ul>
                <li key={e}>name: {e.name}<br/>
                    Duration: {e.duration},<br/>
                    Location: {e.location},<br/>
                    Date: {e.startDate},<br/>
                    Time: {e.startTime},
                </li>

            </ul>
        ))));
    }, [])

    const handleSubmitSignUp = () => {

        useEffect(() => {
            facade.signUp(signUp).then(data => setSigUp(data))
        }, [])
    }


    const handlesigUp = (e) => {
        e.preventDefault()
        setSigUp(e.target.value)
    }


    const handleSubmit = () => {
        facade.fetchShows().then(data => setSeeShows(data))
            .then(res => setIsLoading(false))
    }


    const handleChange = (e) => {
        e.preventDefault()
        setSeeShows(e.target.value)
    }


    return (
        <>
            <h2>Data Received from server</h2>
            <h3>{dataFromServer}</h3>
            <p>{show}</p>

            {/*<input  onChange={handleChange}/>*/}
            {/*<button type="submit" onClick={handleSubmit}>here</button>*/}
            {/*{isLoading ? (*/}

            {/*seeShows.map(item => (*/}
            {/*    <p key={item.id}>{item.name}</p>*/}
            {/*))*/}

            {/*): ("")}*/}
        </>
    )

}

export default LoggedIn