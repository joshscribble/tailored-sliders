// GDE TAILORED DEATH & TPD SLIDER PROTOTYPE - v01.00 Josh Evans


// ---#####| INITIALISE VALUES AND UI |######---
//// ----- INIT: SLIDER VALUES ----- ////

var deathToolTip = document.getElementById("death-tool-tip");
var deathSlider = document.getElementById("death-slider");
var deathMaxLabel = document.getElementById("death-max-label");

var tpdToolTip = document.getElementById("tpd-tool-tip");
var tpdSlider = document.getElementById("tpd-slider");
var tpdMaxLabel = document.getElementById("tpd-max-label");

deathSlider.addEventListener("input", showDeathValue, false);
tpdSlider.addEventListener("input", showTPDValue, false);

//// ----- INIT: TEXT INPUTS ----- ////
var deathTextInput = document.getElementById("death-fixed-text-input");
deathTextInput.addEventListener("change", deathTextChange, false);
var tpdTextInput = document.getElementById("tpd-fixed-text-input");
tpdTextInput.addEventListener("change", tpdTextChange, false);

//// ----- INIT: GLOBAL VARS ----- ////
var currentDeath = 261000;
var currentTPD = 261000;
var sliderFineStep = 1000;
var sliderAgreedStep = 10000;
var tpdSliderMaxRule = 5000000;

//// ----- INIT: UI onLOAD ----- ////
showDeathValue();


// ---#####| BEGIN LOGIC/ FUNCTIONS |######---

//// ----- DEATH SLIDER ----- ////
// Death tool tip
function showDeathValue() {
    var commaValue = numberWithCommas(deathSlider.value);
  // assign values via slide input
  deathToolTip.innerHTML = commaValue;
  deathTextInput.innerHTML = commaValue;
  var deathbulletPosition = (deathSlider.value /deathSlider.max);
  deathSlider.step = sliderAgreedStep;
  deathToolTip.style.left = (deathbulletPosition * 246) + "px";
  //update death text input
  setDeathTextValue(deathSlider.value);
  // deal with tpd
  changeTPDMax();
}

//// ----- TPD SLIDER ----- ////

// Change TPD max = Death value
function changeTPDMax(){
    // assign tpd max to death value
    tpdSlider.max = deathSlider.value;
    // check new max doesn't exeed tpd max rule
    tpdChecker(); 
}

function tpdChecker(){
    // check tpd max rule
    if(tpdSlider.max > tpdSliderMaxRule){
        // document.write("hi");
        tpdSlider.max = tpdSliderMaxRule;
    }
    // update ui values to match result
    tpdMaxLabel.innerHTML = "$" + numberWithCommas(tpdSlider.max);
    showTPDValue();
}

// TPD Tool tip
function showTPDValue() {
    tpdToolTip.innerHTML = numberWithCommas(tpdSlider.value);
    var tpdbulletPosition = (tpdSlider.value /tpdSlider.max);
    tpdSlider.step = sliderAgreedStep;
    tpdToolTip.style.left = (tpdbulletPosition * 246) + "px";
    // update tpd text input
    setTPDTextValue(tpdSlider.value);
  }

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

//// ----- TEXT INPUT FUNCTIONS ----- ////

// DEATH - Change slider based on death text input change
  function deathTextChange(){
    // assign values via text input
    deathSlider.value = deathTextInput.value;
    deathToolTip.innerHTML = numberWithCommas(deathSlider.value);
    // update tooltip pos
    var deathbulletPosition = (deathSlider.value /deathSlider.max);
    deathSlider.step = 10000;
    // deal with tpd
    deathToolTip.style.left = (deathbulletPosition * 246) + "px";
    changeTPDMax();
  }

// Update value in Death text input box
  function setDeathTextValue(x) {
    deathTextInput.value = x;
  }

// TPD - Change slider based on TPD text input change
  function tpdTextChange(){
    // assign values via text input
    // CHECK IF text input exceeds tpd max
    if(tpdTextInput.value > tpdSlider.max){
        // If exceed max, reset text input to max value
        tpdTextInput.value = tpdSlider.max;
        // assign to slider (which will convert to slider step amounts eg.10k)
        tpdSlider.value = tpdTextInput.value;
        // update text to match step increment amount from slider (eg. 10k)
        tpdTextInput.value = tpdSlider.value;
        // proceed with UI update
        tpdToolTip.innerHTML = numberWithCommas(tpdSlider.value);
        var tpdbulletPosition = (tpdSlider.value /tpdSlider.max);
        tpdSlider.step = sliderAgreedStep;
        tpdToolTip.style.left = (tpdbulletPosition * 246) + "px";
    } else {
    // if text input value doesn't exceed tpd max - proceed as normal
    tpdSlider.value = tpdTextInput.value;
    tpdTextInput.value = tpdSlider.value;
    tpdToolTip.innerHTML = numberWithCommas(tpdSlider.value);
    var tpdbulletPosition = (tpdSlider.value /tpdSlider.max);
    tpdSlider.step = sliderAgreedStep;
    tpdToolTip.style.left = (tpdbulletPosition * 246) + "px";
}
  }
// Update value in TPD text input box
  function setTPDTextValue(x) {
    tpdTextInput.value = x;
  }