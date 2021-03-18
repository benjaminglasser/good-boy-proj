// constants - data that never changes

const BASE_URL = "https://dog.ceo/api/breeds/image/random"

// state variables - data that changes
let puppy;

// cached element references = parts of the dom we need to touch
const $fetch = $("#fetch-btn");
const $dogImg = $("#dog-img");
const $breed = $('.breed');

// event listeners
$fetch.click(getData)

// functions - code that represents actions taken/carried out

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
    $dogImg.css("background-image", "url(" + puppy.message +")");
    let breedText = puppy.message.replace("https://images.dog.ceo/breeds/", "");
    let breedText2 = breedText.split('/')[0]
    $breed.text(breedText2);
}