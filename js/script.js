// constants - data that never changes

const BASE_URL = "https://dog.ceo/api/breeds/image/random"

// state variables - data that changes
let puppy;
let goodPup;
let badPup;
// let sound;

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
const $clearBtn = $('#clear');
const $cntr = $('#choices');
const $audio = $('.my_audio')
const containers = document.querySelectorAll('.container')

// event listeners
$fetch.click(getData);
$fetch.click(playSound);
$fetch.click(handleShow);
$goodBtn.click(handleGoodClick);
$badBtn.click(handleBadClick);
$clearBtn.click(handleClear);
// $stop.click(handleStop);

$('#good-boy-cntr').on('click', 'div', function() {
    $(this).closest('div').fadeOut(500, function() {
        $(this).remove()
    })
})

$('#good-boy-cntr').on('click', 'div', function() {
    let localKey = $(this).closest('div').attr('data-url');
    localStorage.removeItem(localKey);
});    

// dragable info

$goodCntr.on('dragstart', 'div', function() {
    $(this).closest('div').addClass('dragging');
});

$goodCntr.on('dragend', 'div', function() {
    $(this).closest('div').removeClass('dragging');
});

$badCntr.on('dragstart', 'div', function() {
    $(this).closest('div').addClass('dragging');
});

$badCntr.on('dragend', 'div', function() {
    $(this).closest('div').removeClass('dragging');
});

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging')
        container.appendChild(draggable);
    })
})


// $badCntr.on('dragover', e => {
//     e.preventDefault();
//     const draggable = document.querySelector('.dragging')
//     $badCntr.prepend(draggable);
//     $(this).removeClass('dragging');

// });
  

//     dropZone.addEventListener("drop", e => {
//         e.preventDefault();
//         const droppedElementData = e.dataTransfer.getData("text/plain");
//         console.log(droppedElementData);
//     })
// }

// bad boys remove

$('#bad-boy-cntr').on('click', 'div', function() {
    $(this).closest('div').fadeOut(500, function() {
        $(this).remove()
    })
})


// functions - code that represents actions taken/carried out

Init();

function Init() {
    $goodBtn.hide() ;
    $badBtn.hide();
    $title.hide();
    $audio.hide();
    $cntr.hide();
    $clearBtn.hide();
}

function playSound(){
    $audio.volume = 0.0;
    $audio.trigger('play');
}

// function handleStop() {
//     sound.pause();
//     $stop.hide();
// }

function handleShow() {
    $fetch.hide();
    $goodBtn.show();
    $badBtn.show();
    $title.show();
    $audio.show();
    $cntr.show();
    $clearBtn.show();
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

function handleClear() {
    $goodCntr.empty();
    $badCntr.empty();
    localStorage.clear();
}

function render() {
    $dogImg.attr({ src: puppy.message });
    let breedText = puppy.message.replace("https://images.dog.ceo/breeds/", "");
    let breedText2 = breedText.split('/')[0]
    $breed.text(breedText2);
    $dogImg.css("box-shadow", "2px 2px 5px 2px #000000a8")
}

function handleGoodClick() {
    $goodCntr.prepend(`<div data-url="${puppy.message}" class="good-boys" draggable="true" style="background-image: url('${puppy.message}');"></div>`);
    const goodBark = new Audio("./music/goodBark.mp3");
    goodBark.play();
    getData();
    localStorage.setItem(puppy.message, puppy.message);
}

function handleBadClick() {
    $badCntr.prepend(`<div data-url="${puppy.message}" class="bad-boys" draggable="true" style="background-image: url('${puppy.message}');"></div>`);
    const badBark = new Audio("./music/badBark.mp3");
    badBark.play(); 
    getData();
}

if(localStorage !== undefined) {
    for(let i = 0; i< localStorage.length; i++){
        let keyStorage = localStorage.key(i);
        let value = localStorage.getItem(keyStorage);
        $goodCntr.prepend(`<div class="good-boys" style="background-image: url('${value}');"></div>`);
    }

}