API_KEY = "adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41";
API = "http://localhost/ecommerce/backend/api/";
API_UPLOAD_IMAGE= "http://localhost/ecommerce/backend/api/uploadImage.php";


addProduct = () => {

   let formProduct = document.getElementById("formProduct");

   let data = new FormData(formProduct);
   let fileProduct = data.get("image");
   data.set("image", data.get("image").name)

   data.append("API_KEY",API_KEY);

    const url = API + 'products';

    fetch(url,
      { method: "POST",
        body: data}
      ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            if (response.status == 200) {
                console.log(response.result);
                uploadImage(fileProduct);
                document.getElementById("formProduct").reset();
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

uploadImage = (file) => {

  let data = new FormData();
  data.append("image", file);
  data.append("API_KEY", API_KEY);

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
