window.addEventListener("load",()=>{
    let list=[]
    let tbody=document.querySelector("#tbody")
    async function getProductDetails(){
        let url=`http://localhost:3051/get-product`;
        let response= await fetch(url, {method: "GET" });
        let data=await response.json()
        if(data.status===true)
        {
            list=data.result
            printPrdDetails(list)
        }
        else
        {
            alert(data.message)
        }

    }
    function printPrdDetails(list)
    {
        tbody.innerHTML=list.map((product,index)=>{
            return ` <tr>
                      <th scope="row">${index+1}</th>
                      <td>${product.productname}</td>
                      <td>${product.qty}</td>
                      <td>${product.price}</td>
                    </tr>`

        }).join("")
    }
    getProductDetails()

   
})