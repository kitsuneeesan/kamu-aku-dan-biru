const fireworks = ['⠄', '⡢', '⢑', '⠈', '⠀', '⢀', '⣠', '⣤', '⡶', '⠞', '⠋', '⠁', '⠀', '⠈', '⠙', '⠳', '⣆', '⡀', '⠀', '⠆', '⡷', '⣹', '⢈', '⠀', '⠐', '⠪', '⢅', '⡀', '⠀'],
    types_to_show_image = ['dGlyZWQ', 'bG9uZWx5'];
let fire_index = 0;

function startTime() {
    document.title = fireworks[fire_index];
    setTimeout(startTime, 200);
    fire_index++;
    if (fire_index == fireworks.length) {
        fire_index = 0
    }
}

async function getNasaImage() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=OVVecEPW04oc6VHUtdB6Bg5KKjUUlJ8nef5CBxge";
    let title = "",
        status = true;
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("nasa-image").src = data.url;
            title = data.title;
        }).catch((err) => {
            status = false;
        });
    return [status, title];
}

function showImage(type) {
    if (types_to_show_image.includes(type)) {
        let img = document.createElement('img');
        img.setAttribute('width', '100%');
        img.setAttribute('id', 'nasa-image');
        document.getElementById("main-card").appendChild(img);
        let status = getNasaImage();
    }
}

async function getType() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('type');
}

async function getMessages(type) {
    const { messages } = await import(`./text/${type}.js`).catch((err) => {
        return import('./text/default.js');
    });
    return messages;
}

function typewriter(messages) {
    let img = document.createElement('p');
    img.setAttribute('id', 'message');
    document.getElementById("main-card").appendChild(img);

    messages.then((messages) => {
        let index = 0;
        const random_index = Math.floor(Math.random() * messages.length) + 0,
            speed = 50;
        function writer() {
            const text = messages[random_index] //+ `gambar di atas itu foto astronomi hari ini btw. judulnya ${data.title}. aku egk tau foto nya seperti apa sih tp semoga kamu suka`;
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
    console.info("made with ❤️ by mas nan");
    startTime();
    const type = await getType();
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
    showImage(type);
    typewriter(getMessages(type));
}