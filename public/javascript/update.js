const deleteBlog= document.querySelectorAll('.delete_blog').forEach((deleteBlog)=>{
    deleteBlog.addEventListener('click', async(e)=>{
        const objectId=e.target.parentElement.id;
        alert(`you're about to DELETE the blog (id:${objectId})`)
        fetch(`/remove_blog/${objectId}`,{
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data =>{
            location.reload();
        })
        .catch(error =>{
            console.error(error)
        })
    })

})

// use the imgBB api to upload an image and save the returned image url in the url input
const addImg=document.getElementById('addImage');

addImg.addEventListener('change', addImage)
async function addImage(){
const addImageInput= document.getElementById("addImage");
const file= addImageInput.files[0];

 // Create a new form data object
 const formData = new FormData();
 formData.append('image', file);

 // Use Axios to upload the image to ImgBB
 const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
   headers: {
     'content-type': 'multipart/form-data'
   },
   params: {
     key: '6ec3827f4865e3031a08d0cabde77286'
   }
 });

 // Get the image URL from the ImgBB API response
 const imgSrcInput= document.getElementById("contentImage");
 const imageUrl = response.data.data.url;
 imgSrcInput.value=imageUrl;
 alert("added")
}