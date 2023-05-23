const deleteBlog= document.getElementById('delete_blog');

deleteBlog.addEventListener('click', async(e)=>{
    const objectId=e.target.parentElement.id;
    console.log(objectId)
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