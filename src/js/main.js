async function getMessages(type) {
    const { messages } = await import(`./text/${type}.js`);
    return messages;
}

const fireworks = ['⠄', '⡢', '⢑', '⠈', '⠀', '⢀', '⣠', '⣤', '⡶', '⠞', '⠋', '⠁', '⠀', '⠈', '⠙', '⠳', '⣆', '⡀', '⠀', '⠆', '⡷', '⣹', '⢈', '⠀', '⠐', '⠪', '⢅', '⡀', '⠀'];
let fire_index = 0;

function startTime() {
    document.title = fireworks[fire_index];
    setTimeout(startTime, 200);
    fire_index++;
    if (fire_index == fireworks.length) {
        fire_index = 0
    }
}

async function getType(type) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('type');
}

function typewriter(messages) {
    messages.then((messages) => {
        let index = 0;
        const random_index = Math.floor(Math.random() * messages.length) + 0,
            speed = 150;
        function writer() {
            const text = messages[random_index];
            if (index < text.length) {
                document.getElementById("message").innerHTML += text.charAt(index);
                index++;
                setTimeout(writer, speed);
            }
        }
        writer();
    });
}

window.onload = async () => {
    startTime();
    await getType().then((type) => {
        var title = document.getElementById('title');
        title.innerHTML = atob(type).toUpperCase();
        typewriter(getMessages(type));
    });
}