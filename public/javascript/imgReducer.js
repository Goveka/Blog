const inputLabel= document.getElementById('input-label');
const customFileInput= document.getElementById('addImages');
const imageName=document.getElementById('img-name');
const imageSize=document.getElementById('imgSize');
const selectedImage=document.getElementById('selectedImage');
const processedImgUrl=document.getElementById('procesedImg');
const processedImgName=document.getElementById('processed-img-name');
const procesedImgSize=document.getElementById('processed-imgSize');
const actualImgText=document.getElementById('actual-img');
const compressed_img=document.getElementById('compressed-img');
const download=document.getElementById('download');


inputLabel.addEventListener("click", ()=>{
    customFileInput.click();
})

customFileInput.addEventListener("change", displayImageAndSize)


 async function displayImageAndSize(){
    const file= customFileInput.files[0];

    if(file){
        actualImgText.textContent="Actual Image";
        compressed_img.textContent="Compressed Image"

       //getting the url of user selected image, and rendering it to the user
        const imageUrl = URL.createObjectURL(file);
        selectedImage.src = imageUrl;

        //setting the image size, and rendering it to the user
        const imagesize= (file.size / 1024).toFixed(2);
        imageSize.textContent= `Image Size: ${imagesize} KB`;

        //rendering the image name
        imageName.textContent= file.name;
        //calling a funtion the decreases the image size and the an object in response
        const resizedFile= await resizeImage(file, 800, 600);

        //getting the compressed img url and rendering the img to the user
        const processed_ImgUrl= URL.createObjectURL(resizedFile);
        processedImgUrl.src=processed_ImgUrl;

         //setting the compressed img size, and rendering it to the user       
        const procesed_img_size= (resizedFile.size / 1024).toFixed(2);
        procesedImgSize.textContent= `New Image size: ${procesed_img_size} KB`;

        // rendering compressed image name
        processedImgName.textContent= resizedFile.name; 

        //rendering the download button
        download.style.display="inline-block";
        download.href=processed_ImgUrl;

        //saving the image object in local storage
        saveToLocalStrorage(resizedFile);
    }else{
        selectedImage.src= "";
        imageSize.textContent= ""
    }

}

//function to save image data to local strorage
function saveToLocalStrorage(file){
    const reader= new FileReader();

    reader.onload=(event)=>{
        const imageData = event.target.result;

        //save the base64-encoded image data to local storage
        localStorage.setItem('resizedImage', imageData);
    };

    reader.readAsDataURL(file)
}

// function to resize the image using HTML canvas
function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve)=>{
    const img= new Image();
    img.src = URL.createObjectURL(file);

    img.onload= ()=>{
      const canvas= document.createElement('canvas');
      let width= img.width;
      let height= img.height;

      if(width > height){
        if(width > maxWidth){
          height *= maxWidth / width;
          width= maxWidth;
        }
      }else{
        if(height > maxHeight){
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width= width;
      canvas.height= height;

      const ctx= canvas.getContext('2d');
      ctx.drawImage(img, 0 , 0, width, height);

      canvas.toBlob((blob)=>{
        resolve(new File([blob], file.name, {type: file.type}));
      }, file.type)
    };
  });
};

//retrieving images saved in local storage and rendering them
const retrievedJSON= localStorage.getItem("resizedImage");
console.log(retrievedJSON)

if(retrievedJSON != null){
    retrievedJSON.forEach(element => {
        let sized_reduced_imgs= document.getElementById('sized-reduced-imgs');
        const div=document.createElement('div');
        const processed_ImgUrl= URL.createObjectURL(element);
        const procesed_img_size= (element.size / 1024).toFixed(2);
    
        div.innerHTML=`<img src=${processed_ImgUrl}> <p>${element.name}</p><p>Image size:${procesed_img_size}KB
        <a href=${processed_ImgUrl} download class="download">Download</a>`;
    
        sized_reduced_imgs.appendChild(div);
        
    });
}