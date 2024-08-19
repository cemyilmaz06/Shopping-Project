const btnSepet=document.querySelector(".btn-sepet");
const sepet=document.querySelector("#sepet");
const imgSepet=document.querySelector("#img-fluid");
const cardSepet=document.querySelector(".card-title");
const sepetMiktar=document.querySelector(".sepet-miktar");
const ürünAzalt=document.querySelector(".fa-minus");
const ürünArttır=document.querySelector(".fa-plus");
const cardTextSepet=document.querySelector(".card-text");
const remove=document.querySelector(".btn-remove");
const toplamTutar=document.querySelector(".toplam-tutar");
const searchInput=document.getElementById("searchInput");
const category=document.querySelector("#category");
const cardImg=document.querySelector(".card-img");
const cardBaslık=document.querySelector(".card-title");
const cardText=document.querySelector(".card-text");
const sepeteEkle=document.querySelector(".sepete-ekle");
const seeDetails=document.querySelector(".see-details");
const modal=document.querySelector(".modal");
const modalBody=document.querySelector(".modal-body");
const kart=document.getElementById("products");
const btns=document.getElementById("btns");



async function shoppingApi() {
    try {
        const res=await fetch("https://anthonyfs.pythonanywhere.com/api/products/");
        const resData=await res.json();
        console.log(resData);
        displayScreen(resData);
    } catch (error) {
        
    }
   
}
shoppingApi();


function displayScreen(resData){
 resData.forEach((product) =>{
    const {image,category,title,price,description} = product;
 
    console.log(`Product: ${title}, Category: ${category}, Price: ${price}, Image:${image},Destcription:${description}`);

kart.innerHTML+=`<div class="col">
          <div class="card">
            <img class="card-img"
              src="${image}"
              class="p-2"
              height="250px"
             
              alt=""
            />
            <div class="card-body">
              <h5 class="card-title line-clamp-1">${title}</h5>
              <p class="card-text line-clamp-2">${description}</p>
            </div>
            <div
              class="card-footer w-100 fw-bold d-flex justify-content-between gap-3"
            >
              <span>Price:</span><span>${price} $</span>
            </div>
            <div class="card-footer w-100 d-flex justify-content-center gap-3">
              <button class="btn btn-danger sepete-ekle ">Sepete Ekle</button>
              <button
                class="btn btn-primary see-details"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                See Details
              </button>
            </div>
          </div>
        </div>`
        

        


        
    });

    
    const kategoriAyir=resData.reduce((biriktir,urun)=>{

      if (!biriktir[urun.category]){
          biriktir[urun.category]=[]
      }
      biriktir[urun.category].push(urun)
    return biriktir

  },[])
kategoriAyir.unshift("all");
  console.log(kategoriAyir);
  const {Electronics, Sports, Home, Shop, Clothings}= kategoriAyir;

Object.keys(kategoriAyir).forEach(category => {
btns.innerHTML = `<button class="btn btn-primary btn-category">ALL</button><button class="btn btn-secondary btn-category">ELECTRONICS</button>
<button class="btn btn-success btn-category">SPORTS</button>
<button class="btn btn-info btn-category">HOME</button>
<button class="btn btn-warning btn-category">SHOP</button>
<button class="btn btn-danger btn-category">CLOTHINGS</button>
`;

document.querySelectorAll(".btn-category").forEach(button => {
  button.addEventListener("click",()=>{

    const selectedCategory = button.textContent.toLowerCase();

    if(selectedCategory=== "all"){
      // displayScreen(resData);
    
    }else{
      const filteredProducts = resData.filter(product => product.category.toLowerCase() === selectedCategory);
      displayScreen(filteredProducts);
      
    }
    
  })
})




})
}









