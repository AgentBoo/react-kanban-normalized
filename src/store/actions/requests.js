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


// DATA REQUESTS AND RESPONSES 

const dataRequest = () => ({
	type: actionType['data-request']
})

const dataSuccess = (message = 'Successfully fetched data') => ({
	type: actionType['data-success'],
	message: message 
})

const dataFailure = (message) => ({
	type: actionType['data-failure'],
	message: message || 'Something went wrong'
})


// FETCH REQUESTS 

export const receiveInitData = (urlpattern) => (dispatch) => {
	const url = endpoint[urlpattern]
	const opt = {}

	const success = (resjson) => {
		dispatch(dataSuccess())
		return dispatch({
			type: actionType[urlpattern],
			data: normalize(resjson, Schemas[urlpattern])
		})
	}

	const failure = (error) => {
		return dispatch(dataFailure(error))
	}

	dispatch(dataRequest())
	return receiveData(url, opt, success, failure)
}


export const newItem = (urlpattern, item) => {
	return sendRequest('POST', urlpattern, item) 
}

export const updateItem = (urlpattern, item) => {
	return sendRequest('PATCH', urlpattern, item) 
}

export const deleteItem = (urlpattern, item) => (dispatch) => {
	const url = endpoint[urlpattern]
	const opt = {
		method: 'DELETE',
		body: JSON.stringify(item)
	}

	const success = (resjson) => dispatch({
		type: actionType[urlpattern],
		id: item.id 
	})

	const failure =  (error) => dispatch(dataFailure(error))
	dispatch(dataRequest())
	return receiveData(url, opt, success, failure)
}

export const bulkUpdate = (urlpattern, item) => (dispatch, getState) => {
	if(getIsFetching(getState())){
		return 
	}

	// check for status only, do not update state with data 
	if(item.source === 'lists'){
		const { index } = getState().lists
		
		const updatedLists = index.map((id, index) => ({
			id: id,
			coord: index  
		}))
		const url = endpoint[urlpattern]
		const options = {
			method: 'PATCH',
			body: JSON.stringify(updatedLists),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
				'X-CSRFToken': Cookies.get('csrftoken')
			}
		}

		dispatch(dataRequest())

		const success = (resjson) => dispatch({
			type: actionType[urlpattern],
			data: normalize(resjson, Schemas[urlpattern])

		})
		const failure = (error) => dispatch(dataFailure(error))
		return receiveData(url, options, success, failure)

	} else if(item.source === 'cards'){
		if(item.origin !== item.destination){
			let ocards = getState().lists.collection[item.origin].cards.map((id, index) => ({
				id: id, 
				luid: item.origin, 
				coord: index
			}))
			let dcards = getState().lists.collection[item.destination].cards.map((id, index) => ({
				id: id,
				luid: item.destination,  
				coord: index 
			}))

			let cards = ocards.concat(dcards)
			const url = endpoint[urlpattern]
			const options = {
				method: 'PATCH',
				body: JSON.stringify(cards),
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
				'X-CSRFToken': Cookies.get('csrftoken') 
			}
		}

		dispatch(dataRequest())

		const success = resjson => dispatch({
			type: actionType[urlpattern],
			data: normalize(resjson, Schemas[urlpattern])
		})
		const failure = error => dispatch(dataFailure(error))
		return receiveData(url, options, success, failure)
	} else {
		let cards = getState().lists.collection[item.destination].cards.map((id, index) => ({
			id: id,
			luid: item.destination,
			coord: index 
		}))

		const url = endpoint[urlpattern]
		const options = {
				method: 'PATCH',
				body: JSON.stringify(cards),
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
				'X-CSRFToken': Cookies.get('csrftoken') 
			}
		}

		dispatch(dataRequest())

		const success = resjson => dispatch({
			type: actionType[urlpattern],
			data: normalize(resjson, Schemas[urlpattern])
		})

		const failure = error => dispatch(dataFailure(error))
		return receiveData(url, options, success, failure)

	}
}
}

// utilities 
const sendRequest = (method, urlpattern, item) => (dispatch) => {
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
	
	const success = (resjson) => {
		dispatch({
			type: actionType[urlpattern],
			data: normalize(resjson, Schemas[urlpattern])
		})
		dispatch({
			type: 'DATA_SUCCESS'
		})
	}

	const failure = (error) => dispatch(dataFailure(error))
	dispatch(dataRequest())
	return receiveData(url, opt, success, failure)
} 


const receiveData = (url, options, successCallback, failureCallback) => {
	return fetch(url, options)
			.then(response => {
				// Django returns JSON response for 200 - 299 statuses 
				if(response.status >= 200 && response.status < 300){
					return response.json().then(resjson => successCallback(resjson))
				}

				// Django returns JSON response for HTTP_400_BAD_REQUEST 
				if(response.status === 400){
					return response.json().then(resjson => failureCallback(resjson))
				}

				// reject everything else 
				return Promise.reject(`${response.status}: ${response.statusText}`)
			})
			.catch(error => failureCallback(error))

}


export const destroyAll = (urlpattern) => (dispatch) => {
	let url = endpoint[urlpattern]
	const failureCallback = (error) => dispatch(dataFailure(error))
	const successCallback = (res) => {dispatch({
				type: 'DESTROY_KANBAN'
			}); return dispatch({ type: 'DATA_SUCCESS', message: res})}
	let options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
			'X-CSRFToken': Cookies.get('csrftoken')
		}
	}
	dispatch(dataRequest())
	return fetch(url, options)
			.then(response => {
				if(response.status === 204){
					return successCallback(response.statusText)
				}
				if(response.status === 400){
					return response.json().then(resjson => failureCallback(resjson))
				}
				return Promise.reject(`${response.status}: ${response.statusText}`)
			})
			.catch(error => failureCallback(error))
}