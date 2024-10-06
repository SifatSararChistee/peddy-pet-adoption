const loadCatagories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCatagories(data.categories);
};

const displayCatagories = (categories) => {
  categories.forEach((categoryItem) => {
    const { category, category_icon } = categoryItem;
    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center", "p-6");
    div.innerHTML = `
        <button class="btn w-[150px]"><img class="w-8" src="${category_icon}" alt="">${category}</button>
    `;
    document.getElementById("catagories").append(div);
  });
};

const loadCards = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/category/cat"
  );
  const data = await response.json();
  displayCards(data.data);
};

const displayCards = (card) => {
  card.forEach((item) => {
    const { pet_name, image, gender, date_of_birth, breed, price } = item;
    console.log(pet_name, image, gender, date_of_birth, breed, price);
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
                  <h2 class="card-title">${pet_name}</h2>
                  <p><i class="fa-solid fa-list mr-2"></i>Breed:${breed}</p>
                  <p><i class="fa-regular fa-calendar mr-2"></i>Birth:${date_of_birth}</p>
                  <p><i class="fa-solid fa-mercury mr-2"></i>Gender:${gender}</p>
                  <p><i class="fa-solid fa-dollar-sign mr-2"></i>Price:${price}</p>
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
loadCards();
