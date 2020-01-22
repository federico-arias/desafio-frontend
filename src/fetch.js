import React, {
	useReducer,
	useEffect
} from "react";

const useFetch = (initialData, url) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case "REQUEST":
				return {
					...state,
					isOngoing: true,
					isLoaded: false
				};
			case "SUCCESS":
				return {
					...state,
					isLoaded: true,
					isOngoing: false,
					data: action.payload
				};
			case "FAILURE":
				return {
					...state,
					isError: true,
					isOngoing: false,
					error: action.payload
				};
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(reducer, {
		isOngoing: false,
		isLoaded: false,
		isError: false,
		error: "",
		data: initialData
	});

	useEffect(() => {
		let didCancel = false;
		dispatch({ type: "REQUEST" });
		async function fetchData() {
			try {
				const response = await fetch(url);
				if (didCancel) throw new Error("no-op");
				const result = await response.json();

				if (response.ok)
					dispatch({
						type: "SUCCESS",
						payload: result
					});
				if (!response.ok)
					dispatch({
						type: "FAILURE",
						payload: response.code
					});
			} catch (error) {
				dispatch({
					type: "FAILURE",
					payload: error.toString() 
				});
			}
		}
		fetchData();
		return () => {
			didCancel = true;
		};
	}, []);

	return state;
};

export { useFetch };
