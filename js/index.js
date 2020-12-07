API_KEY = "API_KEY=adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41";
API = "http://localhost/ecommerce/backend/api/";
API_UPLOAD_IMAGE= "http://localhost/ecommerce/backend/api/uploadImage.php";


addProduct = () => {

  const imageName = localStorage.getItem("image").split("\\")[2];
  const newProduct = {
            name: localStorage.getItem("name"),
            description: localStorage.getItem("description"),
            price: localStorage.getItem("price"),
            stock: localStorage.getItem("stock"),
            category: localStorage.getItem("category"),
            image: imageName
        }

    localStorage.clear();

    let params = constructURLParams(newProduct);
    const url = API + 'products?' + params + API_KEY;

    fetch(url, { method: "POST" })
        .then((response) => {
            if (response.ok) {
                uploadImage();
                document.getElementById("formProduct").reset();
                return response.json();
            }
        })
        .then((response) => {
            if (response.status == 200) {
                console.log(response.result);
                document.getElementsByClassName("close")[0].click();
            } else {
                console.log(response.message);
            }
        })
}

constructURLParams = (object) => {
    result = '';
    for (const property in object) {
        result += `${property}=${object[property]}&`;
    }
    return result;
}

uploadImage = () => {

  let data = new FormData();
  data.append("image", document.querySelector('#fileUpload').files[0]);
  data.append("API_KEY", "adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41");

  fetch(API_UPLOAD_IMAGE, {
    method: "POST",
    body: data
  }).then((response)=>{
    if(response.ok){
      return response.json();
    }
  }).then((result)=>{
    if(result.status == 200){
      console.log("Image stockée sur le serveur avec succès");
    }else{
      console.log(result.message);
    }
  })

}
