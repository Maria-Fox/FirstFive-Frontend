import {useState, useEffect} from "react"
// used to track token throughout the app. Behaves as state w/ localstorage features.

// key = const jobly_token = "jobly-token-key"
function useLocalStorage(key , firstValue = null){
  const initialValue = localStorage.getItem(key) || firstValue;

  // Adds the token to local state- when used for userAuth
  let [item, setItem] = useState(initialValue);

  useEffect(function setLocalStorage() {
    if(!item){
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, item)
    }
  }, [key, item])
  // console.log("local storage is", [item])
  return [item, setItem]
}
export default useLocalStorage;

// token = key.... passed in from App.js