interface Values{
  name:string,
  email:string
  enrollId:string,
  price:number
}
export const fetchTransactionToken = async (url:string,values:Values) => {
  console.log(values)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      console.log(data)

      if (data.data && data.data.token) {
        return data.data.token;
      } else {
        return null
      }
    } catch(e){
      console.log(e)
      return null
    }
  };