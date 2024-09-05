const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");


let allKeys = [],
    audio = new Audio("tunes/a.wav");

const playTune = (key) => {
     audioSrc = `tunes/${key}.wav`;
    if (audio.src !== audioSrc) {
        audio.src = audioSrc;
        audio.load();  // Explicitly load the new audio
    }

    audio.play().catch((err) => {
        console.error("Audio play failed: ", err);
    });


    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

const initializeAudio = () => {
    if (audio.src === "") {
        audio.src = "tunes/a.wav"; // Initial sound (needed to prime the audio context on mobile)
        audio.play().catch(e => console.log("Initial play prevented by mobile policy:", e));
    }
};
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);

    // Handle click event for desktop
    key.addEventListener("click", () => {
        initializeAudio();  // Ensure audio context is initialized
        playTune(key.dataset.key);
    });

    // Handle touch event for mobile (touchstart)
    key.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevents default touch behavior
        initializeAudio();  // Ensure audio context is initialized
        playTune(key.dataset.key);
    }, { passive: true });
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) {
        initializeAudio();
        playTune(e.key);
    };
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
