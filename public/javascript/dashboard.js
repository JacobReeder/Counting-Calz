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
        mealTitleEl.className = ('fs-3 fw-bold text-white text-center border-bottom border-white border-2 my-4 pb-2');
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
        mealNameEl.classList = ('fs-5 text-white text-center my-1');
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

function showGoal(event) {
  event.preventDefault();
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
    setTimeout(() => {
      document.location.reload();
    }, '5000');
  } else {
    alert(goalUpdateRes.statusText);
  }
}

async function putGoal(newGoalVal) {
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
    document.location.reload();
  } else {
    alert(goalUpdateRes.statusText);
  }
}

function newGoalSubmit(event) {
  event.preventDefault();
  const newGoal = goalInputEl.value;
  const dayTotal = document.getElementById('day-total');

  if (dayTotal) {
    putGoal(newGoal, event);
  } else {
    postGoal(newGoal);
  }
}

async function deletePost() {
  const postEl = this.id;
  const idArr = postEl.split('-');
  const id = parseInt(idArr[1]);

  const delResponse = await fetch('/api/posts', {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (delResponse.ok) {
    document.location.reload();
  } else {
    alert(delResponse.statusText);
  }
}

rndMeal();

// event listeners
document.getElementById('new-post-form').addEventListener('submit', newPostSubmit);

goalRevealBtn.addEventListener('click', showGoal);

goalSubmitBtn.addEventListener('click', newGoalSubmit);

// all delete buttons
document.querySelectorAll('.btn-white').forEach((item) => {
  item.addEventListener('click', deletePost);
});
