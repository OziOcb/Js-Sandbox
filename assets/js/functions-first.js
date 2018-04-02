const traficLightSequences = [
  "Main = Green, Sides = Red",
  "Main = Yellow, Sides = Red",
  "Main = Red, Sides = Red and Yellow",
  "Main = Red, Sides = Green",
  "Main = Red, Sides = Yellow",
  "Main = Red and Yellow, Sides = Red"
];

let moveCurrentLight = 5;

////////////////////////////////////////////////////////////
// CSS CLASSES
// Sides
const mainLight = "trafic-lights__main-light";
const leftLight = "trafic-lights__left-light";
const rightLight = "trafic-lights__right-light";
// Colors
const redLight = "trafic-lights__main-light--red";
const yellowLight = "trafic-lights__main-light--yellow";
const greenLight = "trafic-lights__main-light--green";

////////////////////////////////////////////////////////////
// ON / OFF
// FUNCTION THAT TURNS ON CHOSEN LIGHT
function lightOn(sideClass, num, colorClass) {
  document.getElementsByClassName(sideClass)[num].classList.add(colorClass);
}
// FUNCTION THAT TURNS OFF CHOSEN LIGHT
function lightOff(sideClass, num, colorClass) {
  document.getElementsByClassName(sideClass)[num].classList.remove(colorClass);
}

////////////////////////////////////////////////////////////
// FUNCTION THAT TURNS OFF ALL LIGHTS
function turnOffAllLights() {
  // Main Lights
  lightOff(mainLight, 0, redLight);
  lightOff(mainLight, 1, yellowLight);
  lightOff(mainLight, 2, greenLight);
  // Side Reds
  lightOff(leftLight, 0, redLight);
  lightOff(rightLight, 0, redLight);
  // Side Yellos
  lightOff(leftLight, 1, yellowLight);
  lightOff(rightLight, 1, yellowLight);
  // Side Greens
  lightOff(leftLight, 2, greenLight);
  lightOff(rightLight, 2, greenLight);
}

////////////////////////////////////////////////////////////
// FUNCTIONS THAT GORUP TOGETHER SIDE LIGHTS BY THEIR COLOR
function onSideReds() {
  lightOn(leftLight, 0, redLight);
  lightOn(rightLight, 0, redLight);
}
function onSideYellows() {
  lightOn(leftLight, 1, yellowLight);
  lightOn(rightLight, 1, yellowLight);
}
function onSideGreens() {
  lightOn(leftLight, 2, greenLight);
  lightOn(rightLight, 2, greenLight);
}

////////////////////////////////////////////////////////////
// FUNCTION THAT SWITCHES TO THE NEXT LIGHT IN THE SEQUENCE
function nextLight() {
  // Resets moveCurrentLight if it's bigger than traficLightSequences[]
  if (moveCurrentLight === traficLightSequences.length - 1) {
    moveCurrentLight = -1;
  }

  // Moves currentLight by one step
  moveCurrentLight++;
  currentLight = traficLightSequences[moveCurrentLight];

  // turns OFF all lights
  turnOffAllLights();

  // Turns ON chosen lights
  switch (currentLight) {
    case traficLightSequences[0]:
      lightOn(mainLight, 2, greenLight);
      onSideReds();
      break;
    case traficLightSequences[1]:
      lightOn(mainLight, 1, yellowLight);
      onSideReds();
      break;
    case traficLightSequences[2]:
      lightOn(mainLight, 0, redLight);
      onSideReds();
      onSideYellows();
      break;
    case traficLightSequences[3]:
      lightOn(mainLight, 0, redLight);
      onSideGreens();
      break;
    case traficLightSequences[4]:
      lightOn(mainLight, 0, redLight);
      onSideYellows();
      break;
    case traficLightSequences[5]:
      lightOn(mainLight, 0, redLight);
      lightOn(mainLight, 1, yellowLight);
      onSideReds();
      break;
    default:
      console.log("Invalid Item");
      break;
  }
}

////////////////////////////////////////////////////////////
// INTERVALS
let nIntervId;

// Sets time of the interval
function changelight() {
  nIntervId = setInterval(nextLight, 2000);
}

// Stops the interval
function stopLight() {
  clearInterval(nIntervId);
}

////////////////////////////////////////////////////////////
// BUTTON
let buttonOn = true;
changelight();
nextLight();

const getBtnId = document.getElementById("btn");

// Switch between On and Off
getBtnId.onclick = function() {
  if (buttonOn === true) {
    stopLight();
    buttonOn = false;
    getBtnId.textContent = "push to start";
  } else {
    changelight();
    buttonOn = true;
    nextLight();
    getBtnId.textContent = "push to stop";
  }
};
