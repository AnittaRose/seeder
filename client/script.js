async function addfilms(event){
    event.preventDefault();

        console.log('reached add user');

    
    let title = document.getElementById('title').value;
    let rating = document.getElementById('rating').value;
    let categories = document.getElementById('categories').value;
    let language = document.getElementById('language').value;
    let releasedDate = document.getElementById('releaseddate').value;
    let imageInput = document.getElementById('image');

    let base64ImageString = "";

    if(imageInput.files && imageInput.files[0]){
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onloadend = async function (){
            base64ImageString = reader.result;

            let data = {
                title,
                rating,
                categories,
                language,
                releasedDate,
                image : base64ImageString
            };

            let json_data = JSON.stringify(data);
            console.log("json_data",json_data);

            try {
                let response = await fetch (`/movies`, {
                    method: 'POST',
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: json_data,
                });


                console.log('response',response);


                if (response.ok) {
                    alert("films added successfully..");
                    window.location = `index.html`
                }else {
                    alert("something went wrong!");
                }

              
            } catch (error) {
                console.error('Error adding films:',error);
            }
        };

        reader.readAsDataURL(file);
    }else{
        alert("please select an image")
    }
}

async function viewpage(){
    try {
        let response = await fetch('/movies',{
            method: 'GET'
        });

        console.log('response',response);

        let parsed_datas = await response.json();
        console.log('parsed_datas',parsed_datas);

        let data = parsed_datas.data;
        console.log("data",data)

        let datacontainer = document.getElementById('container');

        let rows = '';

        for (let i=0; i<data.length; i++){
            rows+=`
            <div class="container pt-5 ">
                <div class="shadow p-3 mb-5 bg-body rounded ">
                    <div class="text-center fs-1 fw-bold" onclick="handleclick('${data[i]._id}')">${data[i].title}</div>
                    <div class="text-center"  onclick="handleclick('${data[i]._id}')">Language: ${data[i].language.language}</div>
                    <div class="text-center"  onclick="handleclick('${data[i]._id}')">ReleasedDate: ${data[i].releasedDate}</div>
                    <div class="text-center"  onclick="handleclick('${data[i]._id}')">Category: ${data[i].categories.categories}</div>
                    <div class="text-center"  onclick="handleclick('${data[i]._id}')">Rating: ${data[i].rating}</div>
                    <div class="text-center"  onclick="handleclick('${data[i]._id}')"><img src="${data[i].image}"></div>

                </div>
            </div>
            `
        }
        datacontainer.innerHTML = rows
    } catch (error) {
        console.log("error",error);
    }
}

function handleclick(id){
    console.log('id',id)

    window.location=`singledata.html?id=${id}`
}

async function singledata(){
    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let id = params.get('id')
    console.log('id',id);

    try {
        let response = await fetch(`/movies/${id}`,{
            method: 'GET'
        })
        console.log('response',response);

        let parsed_response = await response.json()
        console.log('parsed_response',parsed_response);

        let data = parsed_response.data;
        console.log('data',data)

        let datacontainer = document.getElementById('container')
        console.log('datacontainer',datacontainer);

        let rows=`

        <div class="container d-flex justify-content-center align-items-center flex-column pt-5 shadow p-3 mb-5 bg-body rounded w-25">
            <div class="">
                <div class=""><img src = "${data.image}"></div>
                <div class=" text-center fs-1 fw-bold">${data.title}</div>
                <div class=" text-center ">Rating: ${data.rating}</div>
                <div class=" text-center ">Category: ${data.categories.categories}</div>
                <div class=" text-center ">ReleasedDate: ${data.releasedDate}</div>
                <div class=" text-center ">Language: ${data.language.language}</div>
            </div>
        </div>
        `
        datacontainer.innerHTML=rows;
    } catch (error) {
        console.log('error',error)
    }
}

async function admin(){
    try {
        let response = await fetch('/movies',{
            method: 'GET'
        });

        console.log('response',response);

        let parsed_datas = await response.json();
        console.log('parsed_datas',parsed_datas);

        let data = parsed_datas.data;
        console.log("data",data)

        let datacontainer = document.getElementById('container');

        let rows = '';

        for (let i=0; i<data.length; i++){
            rows+=`
            <div class="container shadow p-3 mb-5 bg-body rounded w-50">
                <div class=" text-center "  onclick="handleclick('${data[i]._id}')"><img src="${data[i].image}"></div>
                <div class="text-center fw-bold fs-1" onclick="handleclick('${data[i]._id}')">${data[i].title}</div>
                <div class="text-center"  onclick="handleclick('${data[i]._id}')">Rating: ${data[i].rating}</div>
                <div class="text-center"  onclick="handleclick('${data[i]._id}')">Language: ${data[i].language.language}</div>
                <div class="text-center"  onclick="handleclick('${data[i]._id}')">Released Date: ${data[i].releasedDate}</div>
                <div class="text-center"  onclick="handleclick('${data[i]._id}')">Category: ${data[i].categories.categories}</div>
                <div class="d-flex justify-content-between">
                    <div class="text-center pt-3" ><button onclick="deleteData('${data[i]._id}')" class="">delete</button></div>
                    <div class="text-center p-3" ><button occlick="updatedata('${data[i]._id}')">Update</button></div>
                </div>
            </div>
            `
        }
        datacontainer.innerHTML = rows
    } catch (error) {
        console.log("error",error);
    }
}

 async function deleteData(id){
    console.log("id :",id);

    try {
        const response = await fetch(`/movies/${id}`, {
            method: 'DELETE',
        });

        const prased_data= await response.json();
        console.log("prased_data",prased_data)

        let data=prased_data.data;
        console.log(data)
        if(response.status===200){
            alert("deleted successfully")
        }else{
            alert("somthing went wrong")
        }

        window.location='admin.html';
    }catch(error){
        console.error('Delete error:', error);

    }

 }