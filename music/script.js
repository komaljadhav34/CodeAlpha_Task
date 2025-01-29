const songs = [
  {
    title: "Faded",
    artist: "Alan Walker",
    cover: "https://1.bp.blogspot.com/-lwFpsbWG59g/WzHpce7p5fI/AAAAAAAAA3o/xrHSZ4vLtx8tix1s557a5B3NYYIcCVl0QCLcBGAs/s1600/alam-walker-faded-song-lyrics-750750.jpg", 
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png", // Blinding Lights Album Cover
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png", // Shape of You Album Cover
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Bad Guy",
    artist: "Billie Eilish",
    cover: "https://i1.sndcdn.com/artworks-000516049308-ixq7jw-t500x500.jpg", 
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "https://i.ytimg.com/vi/57bNHupO3MU/maxresdefault.jpg", 
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

let currentSongIndex = 0;
let isPlaying = false;

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const albumCover = document.getElementById("album-cover");
const songIndex = document.getElementById("song-index");
const playPauseButton = document.querySelector(".play-pause");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const progressBar = document.querySelector(".progress");
const volumeSlider = document.querySelector(".volume-slider");

const audio = new Audio();

function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  albumCover.src = song.cover;
  songIndex.textContent = `${index + 1}/${songs.length}`;
  audio.src = song.audio;
  audio.volume = volumeSlider.value / 100; }

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = "▶️";
  } else {
    audio.play();
    playPauseButton.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progressBar.addEventListener("input", (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

loadSong(currentSongIndex);
