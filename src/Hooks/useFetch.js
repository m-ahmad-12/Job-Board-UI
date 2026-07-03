import { useEffect,useState } from "react";
function useFetch(url){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(!url) return;
const fetched=async()=>{
  setLoading(true);
  setError(null)
  try{
 const result=await fetch(url)
   const conversion=await result.json();
   setData(conversion)
  }
  catch(err){
setError(err)
  }
  finally{
    setLoading(false);
  }
}
fetched();


  },[url]);
  return {data, loading, error};
}



export default useFetch;