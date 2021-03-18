// constants - data that never changes

const BASE_URL = "https://dog.ceo/api/breeds/image/random"

// state variables - data that changes
let puppy;
let goodPup;
let badPup;
let sound;

// cached element references = parts of the dom we need to touch
const $fetch = $("#fetch-btn");
const $dogImg = $("#dog-img");
const $breed = $('.breed');
const $goodBtn = $('#goodboy-btn');
const $badBtn = $('#badboy-btn');
const $goodCntr = $('#good-boy-cntr');
const $badCntr = $('#bad-boy-cntr');
const $title = $('.title');
const $music = $('#music');
const $stop = $('#stop-music');

// event listeners
$fetch.click(getData);
$fetch.click(playSound);
$fetch.click(handleShow);
$goodBtn.click(handleGoodClick);
$badBtn.click(handleBadClick);
$stop.click(handleStop)

// functions - code that represents actions taken/carried out

Init();

function Init() {
    $goodBtn.hide() ;
    $badBtn.hide();
    $title.hide();
    $stop.hide();
}

function playSound(){
    const song = new Audio("./music/song.mp3");
    song.play();
    sound = song;
}

function handleStop() {
    sound.pause();
    $stop.hide();
}

function handleShow() {
    $fetch.hide();
    $goodBtn.show();
    $badBtn.show();
    $title.show();
    $stop.show();
}

function getData() {
    $.ajax(BASE_URL)
    .then(function (data) {
        puppy = data;
        render();
    }, function (error) {
        console.log(error);
    });
}

function render() {
    $dogImg.attr({ src: puppy.message });
    let breedText = puppy.message.replace("https://images.dog.ceo/breeds/", "");
    let breedText2 = breedText.split('/')[0]
    $breed.text(breedText2);
    $dogImg.css("box-shadow", "2px 2px 5px 2px #000000a8")
}

function handleGoodClick() {
    $goodCntr.prepend(`<div class="good-boys" style="background-image: url('${puppy.message}');"></div>`);
    getData();
}

function handleBadClick() {
    $badCntr.prepend(`<div class="good-boys" style="background-image: url('${puppy.message}');"></div>`);
    getData();
}