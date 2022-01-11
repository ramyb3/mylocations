import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';

function AllCategories(props)
{
    const storeData = useSelector(state => state); // get data from store

    const send=(x)=>
    {
        props.callback([x,3,'categories']); //father props is now with category data
    }

    return(<div>

        <ul>
            { storeData.length!=0 ? // if store not empty
            
                <>
                    {
                        storeData[0][0].map((x,index)=> // create a list of all categories names
                        {
                            return <li key={index}><Link className='highlight' to='' onClick={()=> send(x)}>{x}</Link></li>
                        })
                    }
                </> : null
            }
        </ul>

    </div>)
}

export default AllCategories;