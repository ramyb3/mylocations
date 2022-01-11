import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import MenuComp from './models/menu';
import AllCategories from './models/allCategories';
import AddCategory from './models/addCategory';
import AllLocations from './models/allLocations';
import AddLocation from './models/addLocation';
import Location from './models/location';
import Category from './models/category';

function App()
{ 
    const [props,setProps]= useState(); // props element between routes

    return (<div>

         <Routes>

            <Route path="/" element={<MenuComp data={props} callback={()=> setProps()}/>}> {/* nav bar - main route, props= undefined*/}

                <Route path="allCategories" element={<AllCategories callback={data=> setProps(data)}/>}/> {/* props= data*/}
                <Route path="allLocations" element={<AllLocations callback={data=> setProps(data)}/>}/> {/* props= data*/}

                <Route path="addCategory" element={<AddCategory/>}/>
                <Route path="addLocation" element={<AddLocation/>}/>

                <Route path="categories/:id" element={<Category callback={()=> setProps()}/>} /> {/* props= undefined*/}
                <Route path="locations/:id" element={<Location callback={()=> setProps()}/>} /> {/* props= undefined*/}

            </Route>

        </Routes>
        
    </div>);
}

export default App;