export default function reducer(state={
    data: [],
    errors: {},
  }, action) {

    switch (action.type) {

        case "RETRIVE_UPLOADS": {
            return {
                data: [...state.data, ...action.payload],
                errors: {},
            }
        }
        case "REMOVE_UPLOADS": {

            return {
                data: state.data.filter(data => data._id !== action.payload),
                errors: {},
            }
        }
        case "ADD_UPLOADS": {
            return {
                data: [action.payload, ...state.data],
                errors: {},
            }
        }

        case "SEARCH_UPLOADS": {
            
            return {
                data: action.payload,
                errors: {},
            }
        }

        case "EMPTY_UPLOADS": {
            
            return {
                data: {},
                errors: {},
            }
        }

    }

    return state;
}