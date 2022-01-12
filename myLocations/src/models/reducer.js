function reducer(state = [] ,action) 
{
    switch(action.type)
    {
        case "LOAD":    // load first time with starting data
        return [...state, action.payload]
            
        case "addCategory": // if you want to add category
        {
            state[0][0].push(action.payload); // push this category to state

            return [[state[0][0],state[0][1]]]; // return state
        }

        case "addLocation": // if you want to add location
        {
            state[0][1].push(action.payload); // push this location to state

            return [[state[0][0],state[0][1]]]; // return state
        }

        case "update": // if you want to update
        {
            if(action.payload[2]=='categories')
            {
                let arr= state[0][0].filter(x=> x!=action.payload[1]); // get all categories except the category I want to update

                arr.push(action.payload[0]); // push updated category to categories

                return [[arr,state[0][1]]]; // return state
            }

            if(action.payload[2]=='locations')
            {
                let arr= state[0][1].filter(x=> x.name!=action.payload[1].name); // get all locations except the location I want to update

                arr.push(action.payload[0]); // push updated location to locations
                
                return [[state[0][0],arr]]; // return state
            }
        }

        case "delete": // if you want to delete
        {
            if(action.payload[2]=='categories')
            {
                let arr= state[0][0].filter(x=> x!=action.payload[0]); // get all categories except the category I want to delete

                return [[arr,state[0][1]]]; // return state
            }

            if(action.payload[2]=='locations')
            {
                let arr= state[0][1].filter(x=> x.name!=action.payload[0]); // get all locations except the location I want to delete
                
                return [[state[0][0],arr]]; // return state
            }
        }

        default:
        return state;
    }
}

export default reducer;
