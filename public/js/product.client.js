window.addEventListener("load",()=>{
    async function getProductDetails(){
        let url=`http://localhost:3051/get-product`;
        let response= await fetch(url, {method: "GET" });
        let data=await response.json()
        if(data.status===true)
        {
            console.log(data.result)
        }
        else
        {
            alert(data.message)
        }

    }
    getProductDetails()
})