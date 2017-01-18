import axios from "axios"
import _ from "lodash"

export function retriveUploads(increment) {

  	return function(dispatch) {

      	return axios.get(`/api/upload/${increment}`).then(
				(res) => {
          
					dispatch({type: "RETRIVE_UPLOADS", payload: res.data });
				},
				(err ) => {

				});
      	
  	}
}

export function removeUploads(data) {

  	return function(dispatch) {

  		dispatch({type: "REMOVE_UPLOADS", payload: data._id });
  		
      	return axios.delete(`/api/upload/delete/${data._id}`).then(
				(res) => {

				},
				(err ) => {

				});
      	
  	}
}

export function searchUploads(keyword) {

    return function(dispatch) {

        return axios.get(`/api/upload/search/${keyword}`).then(
          (res) => {
            dispatch({type: "SEARCH_UPLOADS", payload: res.data });
            
          },
          (err ) => {

          });
        
    }
}

export function emptyUploads() {

    return function(dispatch) {


        return dispatch({type: "EMPTY_UPLOADS"});
        
    }
}