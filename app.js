let indexSrc = 0;
const srcList = [
  {
    index: 0,
    path: "musics/Pandrezz - Mithril (Beat Tape) - 01 Drippin'.mp3",
    title: "Drippin",
    duration: "2:49",
  },
  {
    index: 1,
    path: "musics/Pandrezz - Mithril (Beat Tape) - 02 dating you.mp3",
    title: "Dating you",
    duration: "2:02",
  },
  {
    index: 2,
    path: "musics/Pandrezz - Mithril (Beat Tape) - 03 leaving you.mp3",
    title: "Leaving you",
    duration: "2:10",
  },
  {
    index: 3,
    path:
      "musics/Pandrezz - Mithril (Beat Tape) - 04 san francisco (feat. Idealism).mp3",
    title: "San Francisco",
    duration: "2:30",
  },
  {
    index: 4,
    path:
      "musics/Pandrezz - Mithril (Beat Tape) - 05 I'm Sorry For This Love Ballad.mp3",
    title: "I'm Sorry For This Love Ballad",
    duration: "2:27",
  },
];

var audio = document.getElementById("audio");
var isMuted = false;
var isPlaying = false;
var isLoop = false;
var speed = 1;
var songIndex = 0;
var nbTracks = document.getElementsByClassName("track__li").length;

//Forked from Chris Coyier's pen : https://codepen.io/chriscoyier/pen/eYNQyPe
var range = document.querySelector(".range");
var bubble = document.querySelector(".bubble");
range.addEventListener("input", () => {
  setBubble(range);
});
// from bubble to song
function setBubble(range) {
  if (range == 0) {
    audio.currentTime = 0;
  } else {
    const val = range.value;
    const min = range.min || 0;
    const max = range.max || 100;
    const offset = Number(((val - min) * 100) / (max - min));
    // yes, 14px is a magic number
    bubble.style.left = `calc(${offset}% - 14px)`;
    var songSecondes = Math.floor((val * audio.duration) / 100);
    // song timing
    audio.currentTime = songSecondes;
  }
  showCurrentTime();
}
// from song to bubble
function updateProgressBar() {
  let offset = 0;
  if (audio.currentTime != 0) {
    const val = Math.floor((100 * audio.currentTime) / audio.duration);
    const min = range.min || 0;
    const max = range.max || 100;
    offset = Number(((val - min) * 100) / (max - min));
  }
  // yes, 14px is a magic number
  bubble.style.left = `calc(${offset}% - 14px)`;
  showCurrentTime();
}

/* ------ song track list  ------- */
function playTrack(songTrack) {
  let audioSrc = document.querySelector("#audio-src");
  audioSrc?.setAttribute("src", "musics/" + songTrack);
  reset();
  play();
}
function previous() {}
function next() {
  console.log("next");
  songIndex++;
  document.getElementsByClassName("track__li")[songIndex].click();
  /*function nextSource() {
    indexSrc++;
    if (indexSrc === srcList.length) indexSrc = 0;
    console.log("nextSource ", indexSrc);
    let audioSrc = document.querySelector("#audio-src");
    audioSrc?.setAttribute("src", srcList[indexSrc].path);
  }songIndex*/
}

/* input event controls */
window.onload = function () {
  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 32) {
      if (!isPlaying) play();
      else stop();
    }
  });

  document
    .getElementById("previousBtn")
    .addEventListener("click", function (e) {
      previous();
    });
  document
    .getElementById("speedDownBtn")
    .addEventListener("click", function (e) {
      speedDown();
    });
  document.getElementById("playBtn").addEventListener("click", function (e) {
    play();
  });
  document.getElementById("pauseBtn").addEventListener("click", function (e) {
    stop();
  });
  document.getElementById("speedUpBtn").addEventListener("click", function (e) {
    speedUp();
  });
  document.getElementById("nextBtn").addEventListener("click", function (e) {
    next();
  });
  document.getElementById("loopBtn").addEventListener("click", function (e) {
    loop();
  });
  document.getElementById("muteBtn").addEventListener("click", function (e) {
    mute();
  });
  document.getElementById("unmuteBtn").addEventListener("click", function (e) {
    unmute();
  });
  document
    .getElementById("volumeDownBtn")
    .addEventListener("click", function (e) {
      volumeDown();
    });
  document
    .getElementById("volumeUpBtn")
    .addEventListener("click", function (e) {
      volumeUp();
    });
};

/* main functions */
function play() {
  isPlaying = true;
  document
    .getElementById("playBtn")
    .classList.replace("available", "notAvailable");
  document
    .getElementById("pauseBtn")
    .classList.replace("notAvailable", "available");
  songPlay();
  animationPlay();
  showSongDuration();
  var id = setInterval(updateProgressBar, 100);
}
function stop() {
  isPlaying = false;
  document
    .getElementById("pauseBtn")
    .classList.replace("available", "notAvailable");
  document
    .getElementById("playBtn")
    .classList.replace("notAvailable", "available");
  songStop();
  animationStop();
}
function mute() {
  isMuted = true;
  document
    .getElementById("muteBtn")
    .classList.replace("available", "notAvailable");
  document
    .getElementById("unmuteBtn")
    .classList.replace("notAvailable", "available");
  enableMute();
  animationMute();
}
function unmute() {
  isMuted = false;
  document
    .getElementById("unmuteBtn")
    .classList.replace("available", "notAvailable");
  document
    .getElementById("muteBtn")
    .classList.replace("notAvailable", "available");
  disableMute();
  animationUnmute();
}
function loop() {
  setLoop(isLoop);
}

/* audio function */
function reset() {
  audio.load();
}
function setLoop(loop) {
  audio.loop = !loop;
  isLoop = !loop;

  if (isLoop) animationIsLoop();
  else animationIsNotLoop();
}
/* audio player functions */
function songPlay() {
  audio.play();
}
function songStop() {
  audio.pause();
}
function enableMute() {
  audio.muted = true;
}
function disableMute() {
  audio.muted = false;
}
function volumeUp() {
  if (audio.volume < 1) audio.volume = Number((audio.volume + 0.1).toFixed(1));
}
function volumeDown() {
  if (audio.volume > 0) audio.volume = Number((audio.volume - 0.1).toFixed(1));
}
function speedUp() {
  if (audio.playbackRate < 4)
    audio.playbackRate = Number((audio.playbackRate + 0.1).toFixed(1));
}
function speedDown() {
  if (audio.playbackRate > 0.1)
    audio.playbackRate = Number((audio.playbackRate - 0.1).toFixed(1));
}

/* animation functions */
function animationIsLoop() {
  document
    .getElementById("paint0_linear_stopcolor1")
    .setAttribute("stop-color", "#FFCA58");
  document
    .getElementById("paint0_linear_stopcolor2")
    .setAttribute("stop-color", "#8B49FF");
}
function animationIsNotLoop() {
  document
    .getElementById("paint0_linear_stopcolor1")
    .setAttribute("stop-color", "#8BD9F1");
  document
    .getElementById("paint0_linear_stopcolor2")
    .setAttribute("stop-color", "#A863FF");
}
function animationPlay() {
  document.getElementById("right-wheel").classList.remove("paused");
  document.getElementById("left-wheel").classList.remove("paused");
  if (!isMuted) {
    document.getElementById("man-bike").classList.remove("paused");
    document.getElementById("hat").classList.remove("paused");
  }
}

function animationStop() {
  document.getElementById("right-wheel").classList.add("paused");
  document.getElementById("left-wheel").classList.add("paused");
  document.getElementById("man-bike").classList.add("paused");
  document.getElementById("hat").classList.add("paused");
}

function animationMute() {
  document.getElementById("man-bike").classList.add("paused");
  document.getElementById("hat").classList.add("paused");
}
function animationUnmute() {
  document.getElementById("man-bike").classList.remove("paused");
  document.getElementById("hat").classList.remove("paused");
  if (isPlaying) play();
  else stop();
}

/* progressbar time */
function showCurrentTime() {
  var songTime = formatSongTime(audio.currentTime);
  document.getElementById("currentTime").innerHTML = songTime;
}
function showSongDuration() {
  var songDuration = formatSongTime(audio.duration);
  document.getElementById("songDuration").innerHTML = songDuration;
}
/*format song time*/
function formatSongTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = Math.round(seconds % 60);
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}
