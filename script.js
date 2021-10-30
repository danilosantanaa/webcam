function loadCamara() {
    let video = document.querySelector("#webcam");

    video.setAttribute("autoplay", '');
    video.setAttribute("muted", '');
    video.setAttribute("playsinline", '');

    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch((error) => {
                alert('ooooops... Falhou!');
            })
    }


    
}


function takeSnapShot() {
    let video = document.querySelector("#webcam");

    let canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0);

    let dataURI = canvas.toDataURL("image/jpeg");
    document.querySelector("#base_img").value = dataURI;

    sendSnapShot(dataURI);
}


function sendSnapShot(base64) {
    let request = new XMLHttpRequest();

    request.open('POST', 'save_photos.php', false);

    request.setRequestHeader('Context-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText)
        

            if(data.error) {
                alert(data.error)
                return false
            }

        
            document.querySelector("#imagemConvertida").setAttribute("src", data.img);
            document.querySelector("#caminhoImagem a").setAttribute("href", data.img);
            document.querySelector("#caminhoImagem a").innerHTML = data.img.split("/")[1];
        } else {
            console.log("Erro ao salvar: Erro tipo - " + request.status)
        }

    }

    
    request.onerror = function() {
        alert("Erro ao salvar. Back-End inacessível.");
    }

    request.send("base_img="+base64);
}


loadCamara();