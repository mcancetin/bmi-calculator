const metricRadio = document.querySelector("#metric");
const imperialRadio = document.querySelector("#imperial");
const container = document.querySelector(".hero__inputs");

const metricTemplate = ` <div class="hero__input-group">
              <div class="text-input">
                <label class="text-input__label | body-sm" for="height">Height</label>
                <input class="text-input__field | heading-md" id="height-cm" type="text" value="0">
                <span class="text-input__unit | heading-md">cm</span>
              </div>
              <div class="text-input">
                <label class="text-input__label | body-sm" for="weight">Weight</label>
                <input class="text-input__field | heading-md" id="weight-kg" type="text" value="0">
                <span class="text-input__unit | heading-md">kg</span>
              </div>
            </div>`;

const imperialTemplate = `<div class="hero__input-group">
              <div class="text-input">
                <label class="text-input__label | body-sm" for="height-ft">Height</label>
                <input class="text-input__field | heading-md" id="height-ft" type="text" value="0">
                <span class="text-input__unit | heading-md">ft</span>
              </div>
              <div class="text-input">
                <input class="text-input__field | heading-md" id="height-in" type="text" value="0">
                <span class="text-input__unit | heading-md">in</span>
              </div>
            </div>
            <div class="hero__input-group">
              <div class="text-input">
                <label class="text-input__label | body-sm" for="weight-st">Weight</label>
                <input class="text-input__field | heading-md" id="weight-st" type="text" value="0">
                <span class="text-input__unit | heading-md">st</span>
              </div>
              <div class="text-input">
                <input class="text-input__field | heading-md" id="weight-lb" type="text" value="0">
                <span class="text-input__unit | heading-md">lbs</span>
              </div>
            </div>`;

let method = "metric";

function addMetricEventListeners() {
  const heightInputCM = document.querySelector("#height-cm");
  const weightInputKG = document.querySelector("#weight-kg");

  heightInputCM.addEventListener("input", () => {
    const height = heightInputCM.value;
    const weight = weightInputKG.value;

    if (validateInput(height) || validateInput(weight)) {
      return;
    }

    const bmi = calculateBMIinMetric(weight, height);
    const range = calculateIdealWeightRangeMetric(height);
    renderResult(bmi, range);
  });

  weightInputKG.addEventListener("input", () => {
    const height = heightInputCM.value;
    const weight = weightInputKG.value;

    if (validateInput(height) || validateInput(weight)) {
      return;
    }

    const bmi = calculateBMIinMetric(weight, height);
    const range = calculateIdealWeightRangeMetric(height);
    renderResult(bmi, range);
  });
}

function addImperialEventListeners() {
  const heightInputFT = document.querySelector("#height-ft");
  const heightInputIN = document.querySelector("#height-in");
  const weightInputST = document.querySelector("#weight-st");
  const weightInputLB = document.querySelector("#weight-lb");

  const updateImperialBMI = () => {
    const heightFt = parseFloat(heightInputFT.value) || 0;
    const heightIn = parseFloat(heightInputIN.value) || 0;
    const height = heightFt * 12 + heightIn;

    const weightSt = parseFloat(weightInputST.value) || 0;
    const weightLb = parseFloat(weightInputLB.value) || 0;
    const weight = weightSt * 14 + weightLb;

    if (validateInput(height) || validateInput(weight)) {
      return;
    }

    const bmi = calculateBMIinImperial(weight, height);
    const range = calculateIdealWeightRangeImperial(height);
    renderResult(bmi, range);
  };

  heightInputFT.addEventListener("input", updateImperialBMI);
  heightInputIN.addEventListener("input", updateImperialBMI);
  weightInputST.addEventListener("input", updateImperialBMI);
  weightInputLB.addEventListener("input", updateImperialBMI);
}

metricRadio.addEventListener("change", () => {
  container.innerHTML = metricTemplate;
  method = "metric";
  addMetricEventListeners();
});

imperialRadio.addEventListener("change", () => {
  container.innerHTML = imperialTemplate;
  method = "imperial";
  addImperialEventListeners();
});

if (method === "metric") {
  addMetricEventListeners();
} else if (method === "imperial") {
  addImperialEventListeners();
}

function calculateBMIinMetric(weight, height) {
  return weight / (height / 100) ** 2;
}

function calculateBMIinImperial(weight, height) {
  return (weight / (height * height)) * 703;
}

function calculateIdealWeightRangeMetric(height) {
  const minBMI = 18.5;
  const maxBMI = 24.9;

  const minWeight = minBMI * (height / 100) ** 2;
  const maxWeight = maxBMI * (height / 100) ** 2;

  return {
    minWeight: minWeight.toFixed(2),
    maxWeight: maxWeight.toFixed(2),
  };
}

function calculateIdealWeightRangeImperial(height) {
  const minBMI = 18.5;
  const maxBMI = 24.9;

  const minWeight = (minBMI * (height * height)) / 703;
  const maxWeight = (maxBMI * (height * height)) / 703;

  return {
    minWeight: minWeight.toFixed(2),
    maxWeight: maxWeight.toFixed(2),
  };
}

function validateInput(value) {
  return value === "" || isNaN(value) || value < 0;
}

function renderResult(bmi, range) {
  const unit = method === "metric" ? "kgs" : "lbs";
  const resultTemplate = `<div>
              <span class="body-md bold">Your BMI is...</span>
              <span class="heading-xl bold" id="result">
               ${bmi.toFixed(1)}
              </span>
            </div>
            <p class="hero__suggestion | body-sm">
              Your BMI suggests you’re a healthy weight. Your ideal weight is between <strong>
                ${range.minWeight}${unit} - ${range.maxWeight}${unit}
              </strong>.
            </p>`;

  const resultContainer = document.querySelector(".hero__result");
  resultContainer.innerHTML = resultTemplate;
}
