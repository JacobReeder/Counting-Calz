const goalRevealBtn = document.getElementById('open-goal-btn');
const goalInputEl = document.getElementById('goal-input');
const goalSubmitBtn = document.getElementById('goal-submit');

async function newPostSubmit(event) {
  event.preventDefault();

  const calories = document.querySelector('input[name="Calories"]').value;
  const mealDesc = document.querySelector('textarea[name="Description"]').value;
  const dateTime = document.querySelector('input[name="Time"]').value;
  console.log(calories, mealDesc, dateTime);

  if (!calories || !mealDesc || !dateTime) {
    window.alert('Please enter all necessary info');
    return;
  }
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
    document.location.reload();
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

// event listeners
document.getElementById('new-post-form').addEventListener('submit', newPostSubmit);

goalRevealBtn.addEventListener('click', showGoal);

goalSubmitBtn.addEventListener('click', newGoalSubmit);

// all delete buttons
document.querySelectorAll('.btn-white').forEach((item) => {
  item.addEventListener('click', deletePost);
});
