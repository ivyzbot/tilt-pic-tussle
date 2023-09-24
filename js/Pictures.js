const ROTATION_UNITS = [-20, -20, -10, -10, 0, 10, 10, 20, 20];

class Pictures {
    constructor(url) {
        this.url = url;
        this.imgName = url.split('/')[url.split('/').length - 1];
        this.type = this.imgName.split(/[-.]/)[2]; // type=1: portrait; type=2: landscape;

        //To give each Picture instance a random rotation degree
        this.rotationUnit = ROTATION_UNITS[Math.floor((Math.random() * ROTATION_UNITS.length))];
    }

    //To ture the picture into an HTML element
    addElement() {
        const alt = this.imgName.split('-')[1];
        let imgEl = document.createElement('img');
        imgEl.src = this.url;
        imgEl.alt = alt;
        if (this.type === '1') {
            imgEl.classList.add('pic-queue', 'portrait');
        } else {
            imgEl.classList.add('pic-queue', 'landscape');
        }
        
        return imgEl;
    }
}

export default Pictures;