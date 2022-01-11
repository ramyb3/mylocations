import { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

function AddCategory()
{
    const dispatch = useDispatch(); // calling to reducer

    const storeData = useSelector(state => state); // get data from store

    const [category,setCategory]= useState(''); // category data

    const send = ()=>
    {
        let check= storeData[0][0].find(x=> x==category); // check other categories with same name

        if(check != undefined) //check if category exists
        alert("This category already exists!!");

        if(category=='') //check if all data in category filled
        alert("You need to enter a name before saving!!");

        if(category!='' && check == undefined)
        dispatch({type : "addCategory", payload : category }); 
    }

    return(<div style={{textAlign: 'center'}}><br/>

        <input placeholder='Enter category name' type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setCategory(e.target.value)}/><br/><br/>
        
        <Link to="/allCategories"><input type="button" onClick={send} value="Add" style={{cursor: "pointer", height: '40px', fontSize: '20px', width: '80px'}}/></Link>

    </div>)
}

export default AddCategory;