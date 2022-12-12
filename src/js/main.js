const fireworks = ['⠄', '⡢', '⢑', '⠈', '⠀', '⢀', '⣠', '⣤', '⡶', '⠞', '⠋', '⠁', '⠀', '⠈', '⠙', '⠳', '⣆', '⡀', '⠀', '⠆', '⡷', '⣹', '⢈', '⠀', '⠐', '⠪', '⢅', '⡀', '⠀'],
    types_to_show_image = ['dGlyZWQ', 'bG9uZWx5'];
let fire_index = 0;

function isPipitDay(date) {
    const pipit_date = `1312${date.getFullYear()}`,
        key = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
    return [pipit_date === key, key];
}

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

function getRandomMessage(messages) {
    const random_index = Math.floor(Math.random() * messages.length) + 0;
    return messages[random_index];
}

function typewriter(message, paragraph_id) {
    let p = document.createElement('p');
    p.setAttribute('id', paragraph_id);
    document.getElementById("main-card").appendChild(p);

    let index = 0;
    const text = message //+ `gambar di atas itu foto astronomi hari ini btw. judulnya ${data.title}. aku egk tau foto nya seperti apa sih tp semoga kamu suka`;
    if (text === '') {
        document.getElementById(paragraph_id).innerHTML += '<br/>';
    }

    function writer() {
        if (index < text.length) {
            document.getElementById(paragraph_id).innerHTML += text.charAt(index);
            index++;
            setTimeout(writer, 100);
        }
    }

    writer();
}

async function displayMessage(type) {
    const messages = await getMessages(type);
    if (type === 'YmlydGhkYXk') {
        const [is_pipit_day, key] = isPipitDay(new Date());
        if (is_pipit_day) {
            let audio = document.getElementById("myAudio");
            audio.play();
            let paragraph_index = 0;
            for (const message of messages[key]) {
                const timeout = 100*message[0].length;
                typewriter(message[0], `paragraph-${paragraph_index}`);
                paragraph_index++;
                await new Promise(resolve => setTimeout(resolve, timeout+1000)); // wait 1 second
            }
        }
        else {
            let message = messages['default'];
            typewriter(message, 'paragraph-0');
        }

    } else {
        const message = getRandomMessage(messages);
        typewriter(message, 'paragraph-0');
    }
}

window.onload = async () => {
    console.info("made with ❤️ by mas nan");
    startTime();
    const type = await getType();
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
    showImage(type);
    displayMessage(type);
}