const rndMealEl = document.querySelector('.rnd-meal');
const goalRevealBtn = document.getElementById('open-goal-btn');
const goalInputEl = document.getElementById('goal-input');
const goalSubmitBtn = document.getElementById('goal-submit');

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
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res.meals[0]);
      if (res.meals[0].strSource !== '') {
        console.log(res.meals[0].strSource);
        // logic to create meal div stuff
      } else {
        rndMeal();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function showGoal() {
  goalRevealBtn.className = 'visually-hidden';
  goalInputEl.className = 'form-control mb-1';
  goalSubmitBtn.className = 'btn btn-danger border border-light shadow';
}

async function postGoal(newGoalPost) {
  const goalUpdateRes = await fetch('/api/goals', {
    method: 'POST',
    body: JSON.stringify({
      newGoalPost,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (goalUpdateRes.ok) {
    document.location.reload();
  } else {
    alert(goalUpdateRes.statusText);
  }
}

async function putGoal(newGoalVal) {
  console.log('here');
  const goalUpdateRes = await fetch('/api/goals/1', {
    method: 'PUT',
    body: JSON.stringify({
      newGoalVal,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (goalUpdateRes.ok) {
    console.log('we go');
    document.location.reload();
  } else {
    console.log('we fail');
    alert(goalUpdateRes.statusText);
  }
}

async function newGoalSubmit(event) {
  event.preventDefault();
  const newGoal = goalInputEl.value;
  const dayTotal = document.getElementById('day-total');

  if (dayTotal) {
    console.log('updating goal');
    putGoal(newGoal);
  } else {
    console.log('still posting');
    postGoal(newGoal);
  }
}

rndMeal();

// event listeners
document.getElementById('new-post-form').addEventListener('submit', newPostSubmit);
goalRevealBtn.addEventListener('click', showGoal);
goalSubmitBtn.addEventListener('click', newGoalSubmit);

// behavior: document is reloading when button gets clicked, shouldn't happen
