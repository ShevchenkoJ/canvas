// CANVAS

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasBackgroundColor = "rgba(240, 240, 214, 1)";
const canvasBrushColor = "rgba(0, 0, 0, 1)";
const actionButtonsArray = Array.from(document.getElementsByClassName("action-button"));

let actionButtonId;
let isMouseDown = false;
let coordinates = [];

canvas.width = window.innerWidth;
console.log(canvas.width);
canvas.height = window.innerHeight - 67;
console.log(canvas.height);

canvas.addEventListener('mousedown', function() {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', function() {
    isMouseDown = false;
    ctx.beginPath();
    coordinates.push('mouseup');
});

ctx.lineWidth = 10 * 2;

canvas.addEventListener('mousemove', function(e) {
    if (isMouseDown) {

        coordinates.push([e.clientX, e.clientY]);
        console.log(coordinates, "1st time we use coordinates");

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});

function save() {
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
    console.log(coordinates, "2nd time we use coord");
}

function clear() {
    ctx.fillStyle = canvasBackgroundColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = canvasBrushColor;
}

function replay() {
    console.log("replay func");
    let timer = setInterval(function() {

        console.log("timer func");
        if (!coordinates.length) {
            console.log("no coords - clear");
            clearInterval(timer);
            console.log(timer, "interval cleared");
            ctx.beginPath();
            return;
        }

        let getCoordinates = coordinates.shift();
        
        let e = {
                clientX: getCoordinates["0"],
                clientY: getCoordinates["1"]
            };

            console.log(getCoordinates, "get coord to paint");

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        console.log("strokes again -replay started");

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

    }, 30);
}

document.addEventListener('keydown', function(e) {

    if (e.keyCode == 83) {
        save();
        console.log("saved");
    }

    if (e.keyCode == 82) {
       
        console.log("replaying");

        coordinates = JSON.parse(localStorage.getItem("coordinates"));
        clear();
        replay();
    }

    if (e.keyCode == 67) {
        clear();
        console.log("clear");
    }

    // if (e.keyCode == n) {
    //     localStorage.clear();
    // }


});

// Add buttons events

// const actionButtonsArray = Array.from(document.getElementsByClassName("action-button"));
// let actionButtonId;
//console.log(actionButtonsArray);

actionButtonsArray.forEach(function(item, i) {
        actionButtonsArray[i].addEventListener("click", doChosenAction);
    });
    
function doChosenAction(event, actionButtonId) {

    actionButtonId = event.target.id;
    console.log(actionButtonId, "function on click - check ID 1");

    switch (actionButtonId) {
        case "save":
            // console.log(actionButtonId,"check ID 2");
            save();
            console.log("saved");
            break;
    
        case "replay":

            console.log("replaying");

            coordinates = JSON.parse(localStorage.getItem("coordinates"));
            clear();
            replay();

            //console.log(actionButtonId,"check ID 2");
            break;

        case "erase":
            //console.log(actionButtonId,"check ID 2");

            clear();
            console.log("clear");
            break;
    }
}

// actionButtonsArray.forEach(function(item, i) {
//     actionButtonsArray[i].addEventListener("click", getActionButtonId);
//     actionButtonsArray[i].addEventListener("click", doActionCheck);
// });

// function getActionButtonId(event) {
//     actionButtonId = event.target.id;
//     console.log(actionButtonId, "function on click - check ID 1");
//     console.log(doActionCheck(actionButtonId), "check ID 2");
// }

// function doActionCheck(actButtonId) {
//     switch (actButtonId) {
//         case "save":
//             console.log(actButtonId,"check ID 4");
//             break;
    
//         case "replay":
//             console.log(actButtonId,"check ID 4");
//             break;

//         case "erase":
//             console.log(actButtonId,"check ID 4");
//             break;
//     }
// }




