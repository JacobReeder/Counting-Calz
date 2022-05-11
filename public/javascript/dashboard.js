const rndMealEl = document.querySelector('.rnd-meal');

async function newPostSubmit(event) {
  event.preventDefault();

  const calories = document.querySelector('input[name="Calories"]').value;
  const mealDesc = document.querySelector('textarea[name="Description"]').value;
  const dateTime = document.querySelector('input[name="Time"]').value;
  console.log(calories, mealDesc, dateTime);

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      mealDesc,
      calories,
      dateTime,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

async function rndMeal() {
  // const url = 'https://www.themealdb.com/api/json/v1/9973533/random.php';
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  console.log(url);

  rndMealEl.innerHtml = '';
  const mealResponse = await fetch(url);
  console.log(mealResponse);
  if (mealResponse.ok) {
    const link = mealResponse.meals[0].strSource;
    console.log(link);
    // rndMealEl.innerHtml = '<a href=""'
  }
}

rndMeal();

document.getElementById('new-post-form').addEventListener('submit', newPostSubmit);
