export class Slider {
    #currentId = null;

    constructor() {
        this.mainComicUrl = 'http://localhost:8010/proxy/info.0.json';
        this.templateUrl = 'http://localhost:8010/proxy/{}/info.0.json';
        this.fetchProcess = false;
        this.imageLoaded = false;
        this.currentData = {};
        this.loadingClassName = 'loading';

        this.elSlider = document.getElementsByClassName('slider')[0];
        this.elBody = document.getElementsByClassName('slider__body')[0];
        this.elNext = document.getElementsByClassName('slider-controls__next')[0];
        this.elPrev = document.getElementsByClassName('slider-controls__prev')[0];
        this.elImg = document.getElementsByClassName('slider__img')[0];
        this.elTitle = document.getElementsByClassName('slider__title')[0];
        this.elDescription = document.getElementsByClassName('slider__description')[0];

        this.setEventListeners()

        const currentId = parseInt(window.location.hash.replace(/[^\d]*/, ''));
        if (currentId) {
            this.currentId = currentId;
        } else {
            this.currentId = 0
        }
    }

    get currentId() {
        return this.#currentId
    }

    set currentId(val) {
        if (!this.fetchProcess) {
            this.#currentId = val;

            setTimeout(async () => {
                 await this.fetchPost();
            });
        }
    }

     get currentUrl() {
         if (!this.currentId) {
             return this.mainComicUrl
         } else {
             return this.templateUrl.replace('{}', String(this.currentId));
         }
     }

    async fetchPost() {
        this.fetchProcess = true;
        this.imageLoaded = false;
        this.elBody.classList.add(this.loadingClassName);

        try {
            if (this.currentId > 0) {
                window.location.replace('#/slider/' + this.currentId)
            } else {
                window.location.replace('#/slider/')
            }

            const response = await fetch(this.currentUrl, {cache: 'no-cache'})
            if (response.ok) {
                this.currentData = await response.json();
                this.elImg.src = this.currentData.img;
                this.elTitle.textContent = this.currentData.safe_title;
                this.elDescription.textContent = this.currentData.alt;
            }
        } catch (error) {
            console.log(error)
        } finally {
            this.fetchProcess = false;
        }
    }

    async prev() {
        if (this.currentId > 0) {
            this.currentId -= 1
        }
    }

     async next() {
        this.currentId += 1
    }

    setEventListeners() {
        this.elPrev.addEventListener('click', async () => {
            await this.prev();
        });

        this.elNext.addEventListener('click', async () => {
            await this.next();
        });

        this.elImg.addEventListener('load', async () => {
            this.imageLoaded = true;
        });

        setInterval(() => {
            if (!this.fetchProcess && this.imageLoaded) {
                this.elBody.classList.remove(this.loadingClassName);
            }
        }, 200)
    }
}