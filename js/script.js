// constants - data that never changes

const BASE_URL = "https://dog.ceo/api/breeds/image/random"

// state variables - data that changes
let puppy;
let goodPup = [];

let badPup = [];
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


// good-boy remove

$goodCntr.on('click', 'div', function() {
    $(this).closest('div').fadeOut(500, function() {
        $(this).remove()
    })
})

$goodCntr.on('click', 'div', function() {
    let info = $(this).closest('div').attr('data-url');
    goodPup = goodPup.filter(function(item) {
        return item !== info
    })
    let goodPup_serialized = JSON.stringify(goodPup);
    localStorage.setItem("Good Puppy", goodPup_serialized);
});    

// dragable info
let url;
$goodCntr.on('dragstart', 'div', function() {
    $(this).closest('div').addClass('dragging');
});

$goodCntr.on('dragend', 'div', function() {
    $(this).closest('div').removeClass('dragging');
    badPup = badPup.filter(function(item) {
        return item !== url
    })
    let badPup_serialized = JSON.stringify(badPup);
    localStorage.setItem("Bad Puppy", badPup_serialized);
    goodPup.unshift(url);
    let goodPup_serialized = JSON.stringify(goodPup);
    localStorage.setItem("Good Puppy", goodPup_serialized);
});

$badCntr.on('dragstart', 'div', function() {
    $(this).closest('div').addClass('dragging');
});

$badCntr.on('dragend', 'div', function() {
    $(this).closest('div').removeClass('dragging');
    goodPup = goodPup.filter(function(item) {
        return item !== url
    })
    let goodPup_serialized = JSON.stringify(goodPup);
    localStorage.setItem("Good Puppy", goodPup_serialized);
    badPup.unshift(url);
    let badPup_serialized = JSON.stringify(badPup);
    localStorage.setItem("Bad Puppy", badPup_serialized);
});

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging')
        container.appendChild(draggable);
        url = draggable.getAttribute('data-url');
    })
})


// bad boys remove

$badCntr.on('click', 'div', function() {
    $(this).closest('div').fadeOut(500, function() {
        $(this).remove()
    })
})

$badCntr.on('click', 'div', function() {
    let info = $(this).closest('div').attr('data-url');
    badPup = badPup.filter(function(item) {
        return item !== info
    })
    let badPup_serialized = JSON.stringify(badPup);
    localStorage.setItem("Bad Puppy", badPup_serialized);
});    


// functions - code that represents actions taken/carried out

Init();

function Init() {
    $goodBtn.hide() ;
    $badBtn.hide();
    $title.hide();
    $audio.hide();
    $cntr.hide();
    $clearBtn.hide();
    if (localStorage.getItem('Good Puppy') !== null) {
        goodPup = JSON.parse(localStorage.getItem('Good Puppy'));
    }
    if (localStorage.getItem('Bad Puppy') !== null) {
        badPup = JSON.parse(localStorage.getItem('Bad Puppy'));
    }
}

function playSound(){
    $audio.volume = 0.0;
    $audio.trigger('play');
}


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

    goodPup.push(puppy.message);
    let goodPup_serialized = JSON.stringify(goodPup);
    localStorage.setItem("Good Puppy", goodPup_serialized);
}

function handleBadClick() {
    $badCntr.prepend(`<div data-url="${puppy.message}" class="bad-boys" draggable="true" style="background-image: url('${puppy.message}');"></div>`);
    badPup.push(puppy.message);
    const badBark = new Audio("./music/badBark.mp3");
    badBark.play(); 
    getData();
    let badPup_serialized = JSON.stringify(badPup);
    localStorage.setItem("Bad Puppy", badPup_serialized);
}


if(localStorage !== undefined) {
    goodPup_deserialized = JSON.parse(localStorage.getItem('Good Puppy'));
    for(let i = 0; i < goodPup_deserialized.length; i++) {
        let value = goodPup_deserialized[i];
        $goodCntr.prepend(`<div data-url="${value}" class="good-boys" draggable="true" style="background-image: url('${value}');"></div>`);
    }
    badPup_deserialized = JSON.parse(localStorage.getItem('Bad Puppy'));
    for(let i = 0; i < badPup_deserialized.length; i++) {
        let value = badPup_deserialized[i];
        $badCntr.prepend(`<div data-url="${value}" class="bad-boys" draggable="true" style="background-image: url('${value}');"></div>`);
    }

}

