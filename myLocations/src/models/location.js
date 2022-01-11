import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams, Link} from 'react-router-dom';

function Location(props)
{
    const storeData = useSelector(state => state); // get data from store

    // 2 objects - 1 before update, 1 updated data
    const [location,setLocation]= useState({name: '', address: '', coordinates: '', category: ''});
    const [before,setBefore]= useState({name: '', address: '', coordinates: '', category: ''});

    const dispatch = useDispatch(); // calling to reducer

    const params= useParams(); //get params from route

    const send = ()=>
    {
        let ok= true; // boolean flag

        //check if location exists
        if(location.name==before.name && location.address==before.address && location.coordinates==before.coordinates && location.category==before.category)
        {
            ok= false; //there is error
            
            alert("This location already exists!!");
        }

        //check if all data in location filled
        if(location.name=='' || location.address=='' || location.coordinates=='' || location.category=='')
        {
            ok= false; //there is error

            alert("You need to fill all form before updating!!");
        }

        if(ok==true) // no errors
        dispatch({type : "update", payload : [location,before,'locations'] }); 

        props.callback(); //father props is empty
    }

    useEffect(()=>
    {
        let temp= params.id.split('+'); // get location name

        setLocation(storeData[0][1].find(x=> x.name==temp[0])); //set updated location data
        setBefore(storeData[0][1].find(x=> x.name==temp[0])); //set pre-update location data

    },[params]); // comp changes every time params change

    return(<div style={{textAlign: 'center', fontSize: '20px'}}><br/>

        {params.id.endsWith('view')? // check if view or update

            //view
            <> 
                <u><b>Location Name:</b></u> {location.name}<br/>
                <u><b>Location Address:</b></u> {location.address}<br/>
                <u><b>Location Coordinates:</b></u> {location.coordinates}<br/>
                <u><b>Location Category:</b></u> {location.category}<br/>
            </> : 
            
            //update - form to update
            <>
                <b>Location Name:</b> <input value={location.name} type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, name: e.target.value})}/><br/><br/>
                <b>Location Address:</b> <input value={location.address} type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, address: e.target.value})}/><br/><br/>
                <b>Location Coordinates:</b> <input value={location.coordinates} type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, coordinates: e.target.value})}/><br/><br/>
                <b>Location Category:</b> <input value={location.category} type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, category: e.target.value})}/><br/><br/>

                <Link to="/allLocations"><input value='Update' type="button" style={{cursor: "pointer", height: '40px', fontSize: '20px', width: '80px'}} onClick={send}/></Link>
            </>
        }

    </div>)
}

export default Location;