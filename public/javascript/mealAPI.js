const nextMealBtn = document.getElementById('next-meal-btn');
const rndMealEl = document.querySelector('.rnd-meal');

function rndMeal() {
  // const url = 'https://www.themealdb.com/api/json/v1/9973533/random.php';
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  rndMealEl.innerHTML = '';
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res.meals[0]);
      if (res.meals[0].strSource !== '') {
        const mealLink = res.meals[0].strSource;
        const mealName = res.meals[0].strMeal;
        const mealThumbnail = res.meals[0].strMealThumb;

        const mealTitleEl = document.createElement('h3');
        mealTitleEl.className = ('fs-3 fw-bold text-white text-center border-bottom border-white border-2 my-4 pb-2 text-shadow');
        mealTitleEl.textContent = ('Try this meal out!');
        rndMealEl.appendChild(mealTitleEl);

        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', mealLink);
        rndMealEl.appendChild(linkEl);

        const thumbnailEl = document.createElement('img');
        thumbnailEl.classList = ('meal-thumbnail');
        thumbnailEl.setAttribute('src', mealThumbnail);
        thumbnailEl.setAttribute('alt', mealName);

        const mealNameEl = document.createElement('h4');
        mealNameEl.classList = ('fs-5 text-white text-center my-1 text-shadow');
        mealNameEl.textContent = (mealName);
        linkEl.appendChild(thumbnailEl);
        linkEl.appendChild(mealNameEl);
      } else {
        rndMeal();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

rndMeal();

nextMealBtn.addEventListener('click', rndMeal);
