// fetch 
import fetch from 'cross-fetch';
// js-cookie 
import Cookies from 'js-cookie';
// normalizr
import { normalize } from 'normalizr';
import Schemas from './../../config/normalizrSchemas';
// constants
import { endpoint, actionType } from './../../config/constants';
import { getIsFetching } from './../selectors';

// PAGE LOADERS AND FLASH MESSAGES 

// let redux know fetching is in progress
const dataRequest = () => ({
	type: actionType['data-request']
});

// send a success flash message to the store
const dataSuccess = (message = 'Successfully fetched data') => ({
	type: actionType['data-success'],
	message: message 
});

// send a failure flash message to the store 
const dataFailure = (message = 'Something went wrong') => ({
	type: actionType['data-failure'],
	message: message
});


// FETCH REQUESTS 

// fetch kanban and save to store 
export const receiveInitData = (urlpattern) => (dispatch) => {
	dispatch(dataRequest())

	const success = (resjson) => dispatch({
		type: actionType[urlpattern],
		data: normalize(resjson, Schemas[urlpattern])
	})

	const failure = (error) => dispatch(dataFailure(error))

	return fetchData(endpoint[urlpattern], {}, success, failure)
};

// destroy everything in kanban
export const deleteAll = (urlpattern) => (dispatch, getState) => {
	if(getIsFetching(getState())){
		return 
	}

	dispatch(dataRequest())

	const success = (resjson) => dispatch({ 
		type: actionType[urlpattern],
		message: resjson 
	})

	const failure = (error) => dispatch(dataFailure(error))

	return fetchData(endpoint[urlpattern], {}, success, failure)
};


// CRUD actions
export const newItem = (urlpattern, item) => {
	return fetchRequest('POST', urlpattern, item) 
};

export const updateItem = (urlpattern, item) => {
	return fetchRequest('PATCH', urlpattern, item) 
};

export const deleteItem = (urlpattern, item) => {
	return fetchRequest('DELETE', urlpattern, item, 'Item deleted!')
};

export const bulkUpdate = (urlpattern, item) => (dispatch, getState) => {
	/*  Bulk update data on the server with current data in the store. 
		Django will send back a list of updated items, 
		so do not update the store with
	*/

	if(getIsFetching(getState())){
		return 
	}

	dispatch(dataRequest())
	let payload = []

	if(item.source === 'lists'){
		payload = getState().lists.index.map((id, index) => ({
			id: id,
			coord: index  
		}))

	} else if(item.source === 'cards'){
		const { collection } = getState().lists 

		if(item.origin !== item.destination){
			let ocards = collection[item.origin].cards.map((id, index) => ({
				id: id, 
				luid: item.origin, 
				coord: index
			}))
			let dcards = collection[item.destination].cards.map((id, index) => ({
				id: id,
				luid: item.destination,  
				coord: index 
			}))

			payload = ocards.concat(dcards)

		} else {
			payload = collection[item.destination].cards.map((id, index) => ({
				id: id,
				luid: item.destination,
				coord: index 
			}))
		}
	}

	const opt = {
		method: 'PATCH',
		body: JSON.stringify(payload),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
			'X-CSRFToken': Cookies.get('csrftoken')
		}
	}

	const success = (resjson) => dispatch({ 
		type: actionType[urlpattern],
		data: normalize(resjson, Schemas[urlpattern])
	})
	const failure = (error) => dispatch(dataFailure(error))
	const successFlash = () => dispatch(dataSuccess('Successfully updated items on the server'))

	return fetchData(endpoint[urlpattern], opt, success, failure, successFlash)
};


// UTILITIES

const fetchRequest = (method, urlpattern, item = {}, message) => (dispatch) => {
	dispatch(dataRequest())

	const url = item.id ? endpoint[urlpattern] + item.id : endpoint[urlpattern]
	const opt = {
		method: method,
		body: JSON.stringify(item),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
			'X-CSRFToken': Cookies.get('csrftoken')
		}
	}

	const failure = (error) => dispatch(dataFailure(error))
	const successFlash = () => message ? dispatch(dataSuccess(message)) : dispatch(dataSuccess())

	if(method === 'DELETE'){
		const success = (res) => dispatch({
			type: actionType[urlpattern],
			item: item 
		})
		
		return fetchData(url, opt, success, failure, successFlash)

	} else {
		const success = (resjson) => dispatch({
			type: actionType[urlpattern],
			data: normalize(resjson, Schemas[urlpattern])
		})

		return fetchData(url, opt, success, failure, successFlash)
	}
}; 


const fetchData = (url, options, successCallback, failureCallback, successFlash, failFlash) =>
	/* 
	  List of Django REST HTTP response statuses can be found here: 
	  http://www.django-rest-framework.org/api-guide/status-codes/ 
  	*/

	fetch(url, options)
		.then(response => {
			// Django returns JSON response for 200 - 299 statuses 
			if(response.status >= 200 && response.status < 300){
				// DELETE response
				if(response.status === 204){
					return response.json().then(resjson => successCallback(resjson))
				}
				console.log(response)
				return response.json().then(resjson => successCallback(resjson))
			}

			// Django returns JSON response for HTTP_400_BAD_REQUEST 
			if(response.status === 400){
				return response.json().then(resjson => failureCallback(resjson))
			}

			// reject everything else 
			return Promise.reject(`${response.status}: ${response.statusText}`)
		})
		.then(() => typeof successFlash === 'function' ? successFlash() : Promise.resolve('Fetch completed'))
		.catch(error => failureCallback(error));


