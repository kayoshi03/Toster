const timerP = document.getElementById("time");
const endData = new Date("Wed Sep 29 2023 16:36:39 GMT+0500 (Екатеринбург, стандартное время)");
const mainSlide = document.querySelector(".mainSlide");
const thumb = document.querySelectorAll(".thumbnail");
const colorSelect = document.getElementById("colorsSelect")
const colorArrow = document.querySelector(".colors:after")

window.onload = () => {
    colorSelect.value = "BLACK"
}
const timer = () => {
    let data = new Date()
    let time = endData.getTime() - data.getTime()
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time/ 1000) % 60);
    timerP.innerText = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}
setInterval(timer, [1000]);

document.addEventListener("DOMContentLoaded", function () {
    thumb.forEach(thumb => {
        thumb.addEventListener("click", function () {
            const src = thumb.querySelector("img").src
            const alt = thumb.querySelector("img").alt
            colorSelect.value = alt
            mainSlide.innerHTML = `<img src="${src}">`;

        })
        colorSelect.addEventListener("change", function (e) {
            const  select = e.target.value;
            mainSlide.innerHTML = `<img src="./img/${select}.png">`
        })

    })
})
