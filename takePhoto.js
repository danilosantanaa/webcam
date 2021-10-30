function CreateElement(element, atributos = {}) {
    let elem = document.createElement(element)

    for(atributo in atributos) {
        elem.setAttribute(atributo, atributos[atributo])
    }

    return elem
}


function Camara(id) {
    return {
            video: null,
            foto: null,
            is_show: false,
            base64: null,

            MediaDevice() {
                this.is_camara_open = false

                if(navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
                        .then((stream) => {
                            this.video.srcObject = stream
                        })
                        .catch((error) => {
                            alert('oooops... Falhou!')
                        })
                }


            },

            carregarCamara() {
                
                this.video = CreateElement("video", {
                    audio: "",
                    autoplay: "",
                    playsinline: ""
                })

                this.MediaDevice()

                this.showImagem()
            },

            reload(){
                
                document.querySelector(id).innerHTML = ""

            },

            showImagem() {
                this.reload()
                document.querySelector(id).append(this.video)

                const button = CreateElement("button", {
                    id: "btn_take_photo"
                })

                button.innerHTML = 'Tirar Foto'

                document.querySelector(id).append(button)
            },

            abrirCamara() {
                this.carregarCamara()
                this.showImagem()
            },

            desligarCamara() {
                const tracks = this.video.srcObject.getTracks()

                tracks.forEach((track) => {
                    track.stop()
                })
            },

            tirarFoto() {

                this.reload()

                let canvas = CreateElement("canvas")

                canvas.width = this.video.videoWidth
                canvas.height = this.video.videoHeight

                let ctx = canvas.getContext("2d")

                ctx.drawImage(this.video, 0, 0)

                this.base64 = canvas.toDataURL("image/jpeg")

                this.foto = CreateElement("img", {
                    src: this.base64
                })

              
                document.querySelector(id).append(this.foto)

                /**Elemento para abrir a camara */
                const button = CreateElement("button", {
                    id: "btn_open_camara"
                })

                button.innerHTML = 'Abrir Camara'
                document.querySelector(id).append(button)    
            },

            getImageBase64() {
                return this.base64
            }

    }
}




const camara = Camara("#container")
camara.abrirCamara()

