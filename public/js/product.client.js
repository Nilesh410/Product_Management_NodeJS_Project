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
                      <td><button data-remove-id="${product._id}" class="remove btn btn-danger btn-sm">DEL</button>
                    </tr>`

        }).join("")
        let removeBttn=document.querySelectorAll(".remove")
        removeBttn.forEach((button)=>{
            button.addEventListener('click',()=>{
                let {removeId}=button.dataset
                removeProduct(removeId)
            })
        })
    }
    async function removeProduct(id)
    {
        let url=`http://localhost:3051/del-product/${id}`;
        console.log(url)
    }
    getProductDetails()

   
})