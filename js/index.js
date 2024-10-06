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
  if (card.length === 0) {
    document.getElementById("cards-container").innerHTML = "";
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "flex-col",
      "col-span-3",
      "bg-[#13131308]",
      "p-10"
    );
    div.innerHTML = `
    <img src="assets/error.webp" alt="">
    <h1 class="font-bold text-3xl">No Information Available</h1>
    <p>We’re sorry, but the information you’re looking for is currently unavailable. Please check back later or explore other sections of our website. If you need immediate assistance, feel free to contact our support team.</p>
    `;
    document.getElementById("cards-container").append(div);
  } else {
    document.getElementById("cards-container").innerHTML = "";
    card.forEach((item) => {
      const { pet_name, image, gender, date_of_birth, breed, price, petId } =
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
                      <button onclick="likeBtn(${petId})" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
                      <button class="btn text-[#0E7A81]">Adopt</button>
                      <button onclick="detailsBtn(${petId})" class="btn text-[#0E7A81]">Details</button>
                    </div>
                  </div>
                </div>
      `;
      document.getElementById("cards-container").append(div);
    });
  }
};

const likeBtn = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  const div = document.createElement("div");
  div.classList.add("h-[100px]");
  div.innerHTML = `
  <img class="rounded-lg" src=${data.petData.image} alt="">
  `;
  document.getElementById("right-side").append(div);
};

const detailsBtn = async (id) => {
  document.getElementById("modal").innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  console.log(data.petData);
  const {
    breed,
    gender,
    vaccinated_status,
    date_of_birth,
    price,
    pet_details,
    image,
    pet_name,
  } = data.petData;
  const modal = document.createElement("div");
  modal.innerHTML = `
   <div class="modal-box w-full h-[800px] space-y-3">
    <div class="p-4">
      <img class="w-full rounded-xl" src=${image} alt="">
    </div>
    <h3 class="text-3xl font-bold">${
      pet_name == null ? "Not Mentioned" : pet_name
    }</h3>
    <div class="flex justify-between">
      <div>
        <p>Breed: ${breed == null ? "Not Mentioned" : breed}</p>
        <p>Gender: ${gender == null ? "Not Mentioned" : gender}</p>
        <p>Vaccinated Status: ${
          vaccinated_status == null ? "Not Mentioned" : vaccinated_status
        }</p>
      </div>
      <div>
        <p>Birth: ${date_of_birth == null ? "Not Mentioned" : date_of_birth}</p>
        <p>Price: ${price == null ? "Not Mentioned" : price}</p>
      </div>
    </div>

    <div>
      <h1 class="text-xl font-bold">
        Details Information
      </h1>
      <p>${pet_details}</p>
    </div>
    <div class="modal-action flex justify-center w-full">
      <form method="dialog">
        <button class="btn w-full px-52 bg-[#0E7A811A] text-[#0E7A81]">Cancel</button>
      </form>
    </div>
  </div>
  `;
  document.getElementById("modal").append(modal);
  document.getElementById("modal").showModal();
};

loadCatagories();
loadAllCards();
