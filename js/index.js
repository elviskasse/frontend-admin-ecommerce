API_KEY = "API_KEY=adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41";
API = "http://localhost/ecommerce/backend/api/";

addProduct = () => {
    const newProduct = {
        name: localStorage.getItem("name"),
        description: localStorage.getItem("description"),
        price: localStorage.getItem("price"),
        stock: localStorage.getItem("stock"),
        category: localStorage.getItem("category"),
        image: localStorage.getItem("image")
    }

    localStorage.clear();
    let params = constructURLParams(newProduct);
    const url = API + 'products?' + params + API_KEY;
    //console.log(url);

    fetch(url, { method: "POST" })
        .then((response) => {
            if (response.ok) {
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