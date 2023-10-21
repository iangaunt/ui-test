var title = document.getElementById("box");
var container = document.getElementById("box-cont");
var circle = document.getElementById("circle");
var limit = 270;
function calculateRotation(x, y, el) {
    var box = el.getBoundingClientRect();
    var calcX = -(y - box.y - (box.height / 2)) / limit;
    var calcY = (x - box.x - (box.width / 2)) / limit;
    return "perspective(150px) " + "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)";
}
function transformElement(el, xyEl) {
    el.style.transform = calculateRotation.apply(null, xyEl);
    el.style.transitionDuration = "0.1s";
}
container.onmousemove = function (e) {
    var xy = [e.clientX, e.clientY];
    var position = xy.concat([container]);
    window.requestAnimationFrame(function () {
        transformElement(title, position);
        var box = title.getBoundingClientRect();
        circle.style.top = e.clientY - box.y - circle.offsetHeight / 2 + "px";
        circle.style.left = e.clientX - box.x - circle.offsetWidth / 2 + "px";
        circle.style.transitionDuration = "0.05s";
    });
};
container.onmouseenter = function () {
    circle.style.opacity = "1";
    circle.style.transitionDuration = "0.5s";
};
container.onmouseleave = function () {
    window.requestAnimationFrame(function () {
        title.style.transform = "perspective(150px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
        title.style.transitionDuration = "0.5s";
        circle.style.transitionDuration = "0.5s";
        circle.style.opacity = "0";
    });
};
for (var i = 0; i < 10; i++) {
    var row = document.createElement("div");
    for (var j = 0; j < 10; j++) {
        var b = document.createElement("p");
        b.id = "b";
        b.classList.add((i * 10 + j).toString());
        row.appendChild(b);
    }
    document.getElementById("flippers").appendChild(row);
}
function randomInt(low, high) {
    return Math.round(Math.random() * (high - low)) + low;
}
setInterval(function () {
    for (var i = 0; i < 5; i++) {
        var pos = randomInt(0, 99).toString();
        var elem = document.getElementsByClassName(pos).item(0);
        var offset = randomInt(100, 250);
        var c = randomInt(0, 1) == 1 ? "Z" : "X";
        elem.style.transform = "rotate" + c + "(" + (randomInt(0, 1) * 180) + "deg)";
        elem.style.background = "rgb(" + offset + ", " + offset + ", 255)";
        elem.style.opacity = (randomInt(5, 10) / 10).toString();
    }
}, 250);
