const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get('type');
console.log(type);

const fireworks = ['⠄', '⡢', '⢑', '⠈', '⠀', '⢀', '⣠', '⣤', '⡶', '⠞', '⠋', '⠁', '⠀', '⠈', '⠙', '⠳', '⣆', '⡀', '⠀', '⠆', '⡷', '⣹', '⢈', '⠀', '⠐', '⠪', '⢅', '⡀', '⠀'];
var fire_index = 0;

function startTime() {
    document.title = fireworks[fire_index];
    setTimeout(startTime, 300);
    fire_index++;
    if (fire_index == fireworks.length) {
        fire_index = 0
    }
}