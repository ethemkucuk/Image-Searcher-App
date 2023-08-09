// Unsplash API erişim anahtarı
const accessKey = "jTtkQ3UccljQaxEqpWlVHwEmNaBBddGFZPuIse31yn8";

// HTML öğelerine referanslar
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// Değişkenler
let inputData = "";
let page = 1;

// Resim aramasını gerçekleştiren fonksiyon
async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  // Sayfa ilk yüklendiğinde arama sonuçlarını temizle
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  // Her bir arama sonucunu ekrana ekle
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  // Sayfa numarası 1'den büyükse "Daha Fazla Göster" butonunu görünür yap
  if (page > 1) {
    showMore.style.display = "block";
  }
}

// Form gönderildiğinde arama yap
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

// "Daha Fazla Göster" butonuna tıklandığında arama yap
showMore.addEventListener("click", () => {
  searchImages();
});
