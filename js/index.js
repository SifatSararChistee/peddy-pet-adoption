//load category buttons
const loadCatagories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCatagories(data.categories);
};

//load Each category
const loadEachCategory = async (category) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();
  displayCards(data.data);
};

//display category buttons
const displayCatagories = (categories) => {
  categories.forEach((categoryItem) => {
    const { category, category_icon } = categoryItem;
    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center", "p-6");
    div.innerHTML = `
        <button id=${category} onclick='loadEachCategory("${category}")' class="btn w-[150px]"><img class="w-8" src="${category_icon}" alt="">${category}</button>
    `;
    document.getElementById("catagories").append(div);
  });
};

//load all cards
const loadAllCards = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayCards(data.pets);
};

//Display all cards
const displayCards = (card) => {
  document.getElementById("cards-container").innerHTML = "";

  card.forEach((item) => {
    const { pet_name, image, gender, date_of_birth, breed, price, category } =
      item;
    const div = document.createElement("div");
    div.innerHTML = `
                  <div class="card bg-base-100 w-[300px] shadow-xl">
                <figure class="px-6 pt-10">
                  <img
                    src=${image}
                    alt="Shoes"
                    class="rounded-xl" />
                </figure>
                <div class="card-body items-start">
                  <h2 class="card-title">${
                    pet_name == null ? "Not Mentioned" : pet_name
                  }</h2>
                  <p><i class="fa-solid fa-list mr-2"></i>Breed: ${
                    breed == null ? "Not Mentioned" : breed
                  }</p>
                  <p><i class="fa-regular fa-calendar mr-2"></i>Birth: ${
                    date_of_birth == null ? "Not Mentioned" : date_of_birth
                  }</p>
                  <p><i class="fa-solid fa-mercury mr-2"></i>Gender: ${
                    gender == null ? "Not Mentioned" : gender
                  }</p>
                  <p><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${
                    price == null ? "Not Mentioned" : price
                  }</p>
                  <div class="flex justify-between w-full">
                    <button class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="btn text-[#0E7A81]">Adopt</button>
                    <button class="btn text-[#0E7A81]">Details</button>
                  </div>
                </div>
              </div>
    `;
    document.getElementById("cards-container").append(div);
  });
};

loadCatagories();
loadAllCards();
