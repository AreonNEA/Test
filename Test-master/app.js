//image
const canvas = document.querySelector("canvas")
const span = document.querySelector("span")
const context = canvas.getContext("2d")

const backgroundImg = document.createElement("img")
backgroundImg.src = "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_toystory_16x9_8461039f.jpeg"

const heroCat = document.createElement("img")

const mouseJerry = document.createElement("img")
mouseJerry.src = "jerry.png"

const boxImg = document.createElement("img")
boxImg.src = "https://opengameart.org/sites/default/files/RTS_Crate.png"

const cakeImg = document.createElement("img")
cakeImg.src = "cake.jpg"


//audio
const sound = document.createElement("audio")
sound.src = "boom.mp3"


const tomMp = document.createElement("audio")
tomMp.src = "tom.mp3"


const nyam = document.createElement("audio")
nyam.src = "nyam.mp3"

const bang = document.createElement("audio")
bang.src = "bang.mp3"

//object data
let data = {
    cat: {
        xDelta: -5,
        yDelta: 0,
        x: canvas.width - 50,
        y: 0,
        width: 200,
        height: 250
    },
    mouse: {

        x: canvas.width - 50,
        y: 500,
        width: 50,
        height: 50

    },
    box: {
        yDelta: -2,
        x: 0,
        y: -10,
        width: 100,
        height: 100

    },
    cake: []
}
let result = 0;
let box = 0


function comparisonFunction(valOne, valTwo) {
    if (valOne.x + valOne.width >= valTwo.x + valTwo.width &&
        valOne.y + valOne.height >= valTwo.y + valTwo.height) {
        valTwo.x = -100;
    }
}

//this is where the objects are updated and compared
function updated() {


    if (data.cat.x + data.cat.width < 0) {
        data.cat.x = canvas.width
    }


    comparisonFunction(data.cat, data.mouse)

    if (data.mouse.x === -100) {
        data.mouse.x = canvas.width + 100
        nyam.currentTime = 0;
        nyam.play();
        result += 1
    } else if (data.mouse.x <= 0) {
        data.mouse.x = canvas.width
    }



    if (data.box.y > canvas.height) {

        data.box.y = -100;
        data.box.x = Math.floor(Math.random() * canvas.width)
    }

    if (
        data.cat.x + 20 < data.box.x + data.box.width
        && data.cat.x - 50 + data.cat.width > data.box.x
        && data.cat.y < data.box.y + data.box.height - 100
        && data.cat.y + data.cat.height - 100 > data.box.y
    ) {
        sound.currentTime = 0;
        sound.play();
        tomMp.play();
        heroCat.src = "cat<X>.png"
        box += 1
        data.cat.x += 4

    } else { heroCat.src = "flycat.png" }

    if (data.cat.y > canvas.height || box >= 100) {
        alert("GAME OVER: You Caught The Mouse " + result + " Times")
        return data.cat.y = 50
    }

    if (result >= 100) {
        data.box.y += +3;
    } else if (result >= 500) {
        alert("YOU WON")

    }



    data.cake.forEach(function (cake) {
        cake.x += cake.xDelta

        if (
            cake.x < data.box.x + data.box.width
            && cake.x + cake.width > data.box.x
            && cake.y < data.box.y + data.box.height
            && cake.y + cake.height > data.box.y
        ) {
            boxImg.src = "boom.jpg"
            bang.play();

            setTimeout(function () {
                data.box.y = -100;
                data.box.x = Math.floor(Math.random() * canvas.width);
            }, 100)
        } else {
            boxImg.src = "https://opengameart.org/sites/default/files/RTS_Crate.png"
        }

    })




    //x and y changes
    data.mouse.x -= 2
    data.box.y -= data.box.yDelta
    data.cat.x += data.cat.xDelta
    data.cat.y += data.cat.yDelta
    span.textContent = result

    //removing unnecessary objects
    data.cake = data.cake.filter(function (cake) {
        if (cake.x < 0) {
            return false;
        }
        return true;
    })

};

/**
 * @param This feature draws a cat, a mouse, a box, a background and a cake.
 */

function draw() {
    context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
    context.drawImage(heroCat, data.cat.x, data.cat.y, data.cat.width, data.cat.height);
    context.drawImage(boxImg, data.box.x, data.box.y, data.box.width, data.box.height);
    context.drawImage(mouseJerry, data.mouse.x, data.mouse.y, data.mouse.width, data.mouse.height);
    data.cake.forEach(function (cake) {
        context.drawImage(cakeImg, cake.x, cake.y, cake.width, cake.height)
    })


};

function loop() {
    requestAnimationFrame(loop)
    updated();
    draw();
}
loop()



//keyboard control
addEventListener("keydown", function (evt) {
    if (evt.code === "ArrowRight") {
        data.cat.xDelta = 0
    } else if (evt.code === "ArrowLeft") {
        data.cat.xDelta = -5
    } else if (evt.code === "ArrowUp") {
        data.cat.yDelta = -1
    } else if (evt.code === "ArrowDown") {
        data.cat.yDelta = +1
    }

    else {
        data.cake.push({
            xDelta: -7,
            x: data.cat.x,
            y: data.cat.y + 100,
            width: 50,
            height: 50
        })
    }
})