import { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

function AddLocation()
{
    const dispatch = useDispatch(); // calling to reducer

    const storeData = useSelector(state => state); // get data from store

    const [location,setLocation]= useState({name: '', address: '', coordinates: '', category: ''});

    const send = ()=>
    {
        let check= storeData[0][1].find(x=> x.name==location.name); // check other locations with same name

        let ok= true; // boolean flag

        if(check != undefined) //check if location exists
        alert("This location already exists!!");

        //check if all data in location filled
        if(location.name=='' || location.address=='' || location.coordinates=='' || location.category=='')
        {
            ok= false; //there is error

            alert("You need to fill all form before saving!!");
        }

        if(ok==true && check == undefined) // no errors
        dispatch({type : "addLocation", payload : location }); 
    }

    return(<div style={{textAlign: 'center'}}><br/>

        <input placeholder='Enter location name' type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, name: e.target.value})}/><br/><br/>
        <input placeholder='Enter location address' type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, address: e.target.value})}/><br/><br/>
        <input placeholder='Enter location coordinates' type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, coordinates: e.target.value})}/><br/><br/>
        <input placeholder='Enter location category' type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setLocation({... location, category: e.target.value})}/><br/><br/>

        <Link to="/allLocations"><input type="button" onClick={send} value="Add" style={{cursor: "pointer", height: '40px', fontSize: '20px', width: '80px'}}/></Link>

    </div>)
}

export default AddLocation;