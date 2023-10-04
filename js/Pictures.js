const ROTATION_UNITS = [-30, -30, -15, -15, 0, 15, 15, 30, 30];
const COLOR = ['black', 'gold', 'gold', 'white', 'white', 'white'];

class Pictures {
    constructor(url) {
        this.url = url;
        this.imgName = url.split('/')[url.split('/').length - 1];
        this.type = this.imgName.split(/[-.]/)[2]; // type=1: portrait; type=2: landscape;

        //To give each Picture instance a random rotation degree
        this.rotationUnit = ROTATION_UNITS[Math.floor((Math.random() * ROTATION_UNITS.length))];
        this.color = COLOR[Math.floor((Math.random() * COLOR.length))];
    }

    //To ture the picture into an HTML element (img tag rapped inside a list tag)
    addElement() {
        const alt = this.imgName.split('-')[1];
        let liEl = document.createElement('li');
        let imgEl = document.createElement('img');
        imgEl.src = this.url;
        imgEl.alt = alt;
        imgEl.style.border = `10px solid ${this.color}`;
        if (this.type === '1') {
            imgEl.classList.add('pic-queue', 'portrait');
        } else {
            imgEl.classList.add('pic-queue', 'landscape');
        }
        
        liEl.appendChild(imgEl);

        return liEl;
    }

    getRotationUnit() {
        return this.rotationUnit;
    }

    getColor() {
        return this.color;
    }

    setRotationUnit(degree) {
        this.rotationUnit += degree;
    }

    resetRotationUnit() {
        this.rotationUnit = ROTATION_UNITS[Math.floor((Math.random() * ROTATION_UNITS.length))];
    }

    resetColor() {
        this.color = COLOR[Math.floor((Math.random() * COLOR.length))];
    }
}

export default Pictures;