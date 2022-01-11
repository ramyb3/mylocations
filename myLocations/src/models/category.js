import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams, Link} from 'react-router-dom';

function Category(props)
{
    const storeData = useSelector(state => state); // get data from store

    const [name,setName]= useState(''); //updated update
    const [before,setBefore]= useState(''); //before update

    const dispatch = useDispatch(); // calling to reducer

    const params= useParams(); //get params from route

    const send = ()=> 
    {
        let check= storeData[0][0].find(x=> x==name); // check other categories with same name

        if(check != undefined) //check if category exists
        alert("This category already exists!!");

        if(name=='') //check if all data in category filled
        alert("You need to enter a name before updating!!");

        if(name!='' && check == undefined)
        dispatch({type : "update", payload : [name,before,'categories'] }); 

        props.callback(); //father props is empty
    }

    useEffect(()=>
    {
        let temp= params.id.split('+'); // get category name

        setName(temp[0]); //set updated category data
        setBefore(temp[0]); //set pre-update category data

    },[params]); // comp changes every time params change

    return(<div style={{textAlign: 'center', fontSize: '20px'}}><br/>

        {params.id.endsWith('view')? // check if view or update
        
            //view
            <><u><b>Category Name:</b></u> {name}<br/></> : 
            
            //update - form to update
            <>
                <b>Category Name:</b> <input value={name} type="text" style={{fontSize: '20px', height: '30px'}} onChange={e =>setName(e.target.value)}/><br/><br/>
                <Link to='/allCategories'> <input value='Update' type="button" style={{cursor: "pointer", height: '40px', fontSize: '20px', width: '80px'}} onClick={send}/></Link>
            </>
        }

    </div>)
}

export default Category;