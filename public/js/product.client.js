window.addEventListener("load",()=>{
    function getProductDetails(){
        let url=`http://localhost:3051/get-product`;
        fetch(url, {method: "GET" });
    }
    getProductDetails()
})