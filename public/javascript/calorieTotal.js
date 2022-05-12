const todaysCalories = 0;

const calories = document.querySelector('input[name="Calories"]').value;

todaysCalories.push(calories);

let calorieTotal = 0;

for (let i = 0; i < todaysCalories.length; i += 1) {
  calorieTotal += todaysCalories[i];
}
console.log(calorieTotal);
