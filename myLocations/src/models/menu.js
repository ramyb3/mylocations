import {useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style.css';

function Menu(props)
{
    const dispatch = useDispatch(); // calling to reducer

    const [check,setCheck]= useState(0); // flag

    const send=()=>
    {
        setCheck(0); // default flag

        props.callback(); //father props is empty
    }

    useEffect(() => // only when app starts
    {
        let category= ['temp', 'avvd'];
        let location=[{name: 'zvzx', address: 'temp', coordinates: '1', category: 'temp'},{name: 'abc', address: 'abc', coordinates: '2', category: 'abc'}];

        dispatch({type : "LOAD" , payload : [category,location]});
    },[]);

    return(<div>

        <div className='navbar'>     
            
            {check!=1 && props.data== undefined ? //main page

                <Link className='title' to="/allCategories" onClick={()=> setCheck(2)}><b>Categories</b></Link>
                : null    
            }

            {check!=2 && props.data== undefined ? //main page

                <Link className='title' to="/allLocations" onClick={()=> setCheck(1)} ><b>Locations</b></Link>
                : null
            }

            {check==2 && props.data== undefined ? //when Categories pressed

                <Link className='link' to="/addCategory" ><b>Create New Category</b></Link>
                : null
            }

            {check==1 && props.data== undefined ? //when Locations pressed

                <Link className='link' to="/addLocation" ><b>Create New Location</b></Link>
                : null
            }

            {props.data!= undefined?  //if props not empty

                <> 
                    {props.data[1]==3? // if I clicked a name in a list

                        <>
                            <b className='title' style={{cursor: 'pointer'}}>{props.data[0]}</b>

                            <Link className='link' to={"/"+ props.data[2] + "/" + props.data[0] + "+view"} ><b>View</b></Link>
                            <Link className='link' to={"/"+ props.data[2] + "/" + props.data[0] + "+update"} ><b>Update</b></Link>
                            <Link className='link' to="/" onClick={()=> (send(), dispatch({type : "delete" , payload : props.data}))}><b>Delete</b></Link>
                        </> 
                        : null    
                    }
                </> : null
            }

        </div><br/><br/><br/>

        <Outlet/> {/* routes controller */}

        {check!=0 ? // back to menu only when not in main page

           <> <br/><br/><br/><Link to="/" style={{fontSize: '20px'}} onClick={()=> send()}>Menu Page</Link></> : null
        }

    </div>)
}

export default Menu;