
let indexSrc = 0
const srcList = [
  {
    "index": 0,
    "path": "musics/Pandrezz - Mithril (Beat Tape) - 01 Drippin'.mp3",
    "title": "Drippin",
    "duration": "2:49"
  },
  {
    "index": 1,
    "path": "musics/Pandrezz - Mithril (Beat Tape) - 02 dating you.mp3",
    "title": "Dating you",
    "duration": "2:02"
  },
  {
    "index": 2,
    "path": "musics/Pandrezz - Mithril (Beat Tape) - 03 leaving you.mp3",
    "title": "Leaving you",
    "duration": "2:10"
  },
  {
    "index": 3,
    "path": "musics/Pandrezz - Mithril (Beat Tape) - 04 san francisco (feat. Idealism).mp3",
    "title": "San Francisco",
    "duration": "2:30"
  }, {
    "index": 4,
    "path": "musics/Pandrezz - Mithril (Beat Tape) - 05 I'm Sorry For This Love Ballad.mp3",
    "title": "I'm Sorry For This Love Ballad",
    "duration": "2:27"
  }
]

function nextSource() {
  indexSrc++
  if (indexSrc === srcList.length) indexSrc = 0
  console.log("nextSource ", indexSrc)
  let audioSrc = document.querySelector('#audio-src')
  audioSrc?.setAttribute('src', srcList[indexSrc].path)
}

function playSong(index) {
  let song = srcList[index]
  let audioSrc = document.querySelector('#audio-src')
  audioSrc?.setAttribute('src', song.path)
  const audio= (document.querySelector('#audio'))
  audio?.load()
  audio?.play()
}

//https://www.w3schools.com/jsref/dom_obj_audio.asp