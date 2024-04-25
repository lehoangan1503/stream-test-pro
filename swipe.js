document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", resetCoordinates);
var xDown = null;
var yDown = null;
var typeOfSwipe = null;
var tendArray = new Array(10);

var i = 0;
const volControl = document.getElementById("vol-control");
const overlayVol = document.getElementById("overlay-volume");

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;
  if (i == 10) {
    typeOfSwipe = determinesDirection();
  }

  if (Math.abs(xDiff) > Math.abs(yDiff) && (typeOfSwipe == "horizontal" || typeOfSwipe == null)) {
    /*most significant*/
    i <= 9 ? (tendArray[i] = "horizontal") : "";
    if (xDiff > 0) {
      // swipe left
      video.currentTime -= 1;
    } else {
      // swipe right
      video.currentTime += 1;
    }
  } else {
    i <= 9 ? (tendArray[i] = "vertical") : "";
    if (yDiff > 0) {
      // swipe up
      video.volume + 0.01 > 1 ? "" : (video.volume += 0.02);

      volControl.value = Math.abs(video.volume * 100);
      overlayVol.style.display = "flex";
      overlayVol.style.opacity = 1;
      clearTimeout(timeoutOpacity);
      clearTimeout(timeoutHide);
      timeoutOpacity = setTimeout(() => {
        overlayVol.style.opacity = 0;
      }, 2000);
      timeoutHide = setTimeout(() => {
        overlayVol.style.display = "none";
      }, 3000);
    } else {
      // swipe down
      video.volume - 0.01 < 0 ? "" : (video.volume -= 0.02);
      volControl.value = Math.abs(video.volume * 100);
      overlayVol.style.display = "flex";
      overlayVol.style.opacity = 1;
      clearTimeout(timeoutOpacity);
      clearTimeout(timeoutHide);
      timeoutOpacity = setTimeout(() => {
        overlayVol.style.opacity = 0;
      }, 2000);
      timeoutHide = setTimeout(() => {
        overlayVol.style.display = "none";
      }, 3000);
    }
  }
  i++;
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}
function determinesDirection() {
  console.log(tendArray);
  let counts = {};

  tendArray.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  let mostFrequentValue = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  return mostFrequentValue;
}
function resetCoordinates() {
  xDown = null;
  yDown = null;
  i = 0;
  tendArray.forEach((_, index) => (tendArray[index] = null));
  typeOfSwipe = null;
}
