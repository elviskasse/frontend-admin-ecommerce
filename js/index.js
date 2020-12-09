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

updateProduct = (id,oldImageName) =>{

  let formUpdateProduct = document.getElementById("formUpdateProduct-"+id);
  let data = new FormData(formUpdateProduct);
  data.append("API_KEY",API_KEY);
  data.append("idProduct", id);

  let imageToUpload = data.get("image");

  if(imageToUpload.name !== ""){
    data.set("image", imageToUpload.name);
  }else{
    data.set("image", oldImageName)
  }

  let dataValue = {};

  for(var value of data.entries()){
    dataValue[value[0]] = value[1];
  }

  const url = API + 'products?'+constructURLParams(dataValue);

  fetch(url,{method: "PUT"})
  .then((response)=>{
    if(response.ok){
      return response.json();
    }else{
      console.log("Erreur déclenchée lors de l'exécution de la requête de mise à jour du produit");
    }
  })
  .then((result)=>{
    if(result.status == 200){
      if(imageToUpload.name !== ""){
        uploadImage(imageToUpload);
        deleteImage(oldImageName);
      }

      var table = $("#dataTable").DataTable();
      var products = table.rows().data();
      var product = products.filter(element => element.idProduct == id)[0];
      var index = products.indexOf(product);

      product.name = dataValue.name;
      product.description = dataValue.description;
      product.price = dataValue.price;
      product.stock = dataValue.stock;
      product.category = dataValue.category;
      product.image = dataValue.image;
      $("#dataTable").dataTable().fnUpdate(product,index,undefined,false);
    }else{
      console.log(result.message);
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

deleteImage = (name) =>{
  const url = API + 'image?name='+name+'&API_KEY='+API_KEY;

  fetch(url, {method: 'DELETE'})
  .then((response)=>{
    if(response.ok){
      return response.json();
    }else{
      console.log("Erreur déclenchée lors de l'exécution de la requête ");
    }
  })
  .then((result)=>{
    if(result.status == 200){
      console.log(result.result);
    }else{
      console.log(result.message);
    }
  })


}
