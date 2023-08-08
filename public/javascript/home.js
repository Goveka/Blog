const screenWidth= window.innerWidth;
console.log(screenWidth)
if(screenWidth < 1023){
    document.addEventListener("DOMContentLoaded",()=>{
         document.querySelectorAll(".limitedParagraph").forEach((paragraph)=>{
            let words = paragraph.textContent.split("");
    
            if (words.length >50){
                paragraph.textContent= words.slice(0,50).join("")+ "...";
            }
        })
    }) 
}else{
    document.addEventListener("DOMContentLoaded",()=>{
         document.querySelectorAll(".limitedParagraph").forEach((paragraph)=>{
            let words = paragraph.textContent.split("");
    
            if (words.length >350){
                paragraph.textContent= words.slice(0,350).join("")+ "...";
            }
        })
    })
}
document.addEventListener("DOMContentLoaded",()=>{
    let paragraph= document.querySelectorAll(".limitedParagraph").forEach((paragraph)=>{
        let words = paragraph.textContent.split("");

        if (words.length >250){
            paragraph.textContent= words.slice(0,250).join("")+ "...";
        }
    })
})

const searchBtn=document.getElementById('searchBtn');

searchBtn.addEventListener('click', (e)=>{
    const searchInput=document.getElementById('searchInput').value.toLowerCase().trim();

    if(searchInput === ""){
        alert("The search input can't be empty")
    }else{
        window.location.href= `/search/${encodeURIComponent(searchInput)}`;
    }

});
