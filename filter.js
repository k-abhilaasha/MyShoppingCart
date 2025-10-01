// Sample products
const products = [
  { id: 1, name: "Shoes", category: "Shoes", price: 2500, img: "photos/shoe.jpg" },
  { id: 2, name: "Shirt", category: "Clothes", price: 5000, img: "photos/shirt.jpg" },
  { id: 3, name: "Tablet", category: "Electronics", price: 66300, img: "photos/tab.jpg" },
  { id: 4, name: "Badminton", category: "Sports Equipment", price: 1000, img: "photos/badminton.jpg" },
  { id: 5, name: "TV", category: "Electronics", price: 40000, img: "photos/tv.jpg" }
];

// References
const productContainer = document.querySelector('.catalog-page');
const filterBar = document.querySelector('.filter-bar');

// Render products
function renderProducts(items) {
  productContainer.innerHTML = "";
  if (items.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>${p.category}</p>
      </div>
    `;
    productContainer.appendChild(div);
  });
}

// Initial load
renderProducts(products);

// Filter logic
filterBar.addEventListener("change", () => {
  const categoryFilters = [...filterBar.querySelectorAll("input[type=checkbox]:checked")]
    .filter(cb => cb.value)
    .map(cb => cb.value);

  const priceFilters = [...filterBar.querySelectorAll("input[type=checkbox]:checked")]
    .filter(cb => cb.dataset.min)
    .map(cb => ({ min: parseInt(cb.dataset.min), max: parseInt(cb.dataset.max) }));

  const filtered = products.filter(p => {
    const matchCategory = categoryFilters.length === 0 || categoryFilters.includes(p.category);
    const matchPrice = priceFilters.length === 0 || priceFilters.some(r => p.price >= r.min && p.price <= r.max);
    return matchCategory && matchPrice;
  });

  renderProducts(filtered);
});
