export default class Modal {
  // constructor
  constructor(data, sectionName = 'eventos') {
    this.data = data;
    this.sectionName = sectionName;
    this._openModal();

    // event handlers

    // Close Modal
    document.querySelector('.modal__button-close').addEventListener('click', this._closeModal);

    document
        .querySelector('.modal__overlay')
        .addEventListener('click', this._closeModal);

    window.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        document
            .querySelector('.modal__overlay')
            .classList.contains('modal__overlay--active')
      ) {
        this._closeModal();
      }
    });
  }

  // methods
  #renderImageSwiperSlide(urlImages) {
    let html = '';
    urlImages.forEach((urlImage, index) => {
      html += `
        <div class="swiper-slide">
        <img class="mx-auto" src="${urlImage}" alt="galeria-${index}">
        </div>
        `;
    });
    return html;
  }

  // render modal
  _renderModal() {
    const html = `
    <div class="modal modal--events">
    <div class="modal__button-close">
        X
    </div>
${this.sectionName === 'eventos' ?
        `
    <div class="event__item" style="background-color: #F0F0F2; box-shadow: 0px 6px 11px #00305766;">
      <div class="event__container-left">
        <span class="event__municipio-departamento">
            ${this.data.municipio} - ${this.data.departamento}
        </span>
        <h3 class="event__titulo">
            <span class="event__nombre">
             ${this.data.titulo}
            </span>
            <img class="event__image-titulo" src="/images/eventos/nombre-evento.svg" alt="nombre evento">
        </h3>
        <div class="text-purple">
            <p class="font-bold text-xl xl:text-2xl">
                02
            </p>
            <p class="-mt-2">  
            ${this.data.mes}
            </p>
        </div>
        <p class="text-lg xl:text-xl">
          ${this.data.descripcion}
        </p>
        <div class="flex justify-between">
            <div>
                <p class="italic text-lg xl:text-xl text-purple">
                  ${this.data.tipo}
                </p>
            </div>
            <div>
                <p class="text-lg xl:text-xl text-space-cadet">
                  Comunidad Focalizada
                </p>
            </div>
        </div>
      </div>
      <div class="event__container-right">
        <img class="event__image" src="${this.data.imagen !== '' ? this.data.imagen : '/images/eventos/prueba.jpg'}" alt="${this.data.titulo}">
        <a class="inline-block uppercase py-2 px-4 font-semibold text-white absolute bottom-0 right-0" href="/galeria/multimedia/" style="background-color: #D27028;">Ver galería</a>
      </div>
    </div>
      ` :
        `
        <div class="pt-12 pb-6">
            <div class="space-y-6 px-8 pb-6">
                <!-- Slider main container -->
                <div class="swiper mySwiper2">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                        ${this.#renderImageSwiperSlide(this.data['galeria_images'])}
                    </div>
                    <!-- If we need navigation buttons -->
                    <div class="swiper-button-prev" style="left: 40px !important;">
                        <img src="/images/galeria/multimedia/arrow-left.svg" alt="arrow left">
                    </div>
                    <div class="swiper-button-next" style="right: 40px !important;">
                        <img src="/images/galeria/multimedia/arrow-right.svg" alt="arrow right">
                    </div>
                </div>
    
                <!-- Slider main container -->
                <div thumbsSlider="" class="swiper mySwiper" style="height: 105px;">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                        ${this.#renderImageSwiperSlide(this.data['galeria_images'])}
                    </div>
                </div>
            </div>
            <div class="galeria">
                <div class="galeria__child-1" style="border-color: #DBDBDB;">
                    <div style="max-width: 249px;">
                        <h4 class="galeria__title">
                            ${this.data['nombre_galeria']}
                        </h4>
                    </div>
                    <div style="max-width: 475px;">
                        <p class="galeria__description">
                            ${this.data['descripcion_galeria']}
                        </p>
                    </div>
                </div>
                <div class="galeria__child-2" style="border-color: #DBDBDB;">
                    <div>
                        <a href="" class="galeria__comunidad-focalizada">
                            ${this.data.comunidad}
                        </a>
                    </div>
                    <div>
                        <p>
                            ${this.data.municipio} - ${this.data.departamento}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      `
}
    </div>
    <div class="modal__overlay">
        &nbsp;
    </div>
    `;
    return document.body.insertAdjacentHTML('beforeend', html);
  }

  // open modal
  _openModal() {
    this._renderModal();
    setTimeout(() => {
      document.querySelector('.modal').classList.add('modal--active');
      document.querySelector('.modal__overlay').classList.add('modal__overlay--active');
    }, 100);
  }

  // close modal
  _closeModal() {
    document.querySelector('.modal').classList.remove('modal--active');
    document.querySelector('.modal__overlay').classList.remove('modal__overlay--active');

    setTimeout(() => {
      document.querySelector('.modal').remove();
      document.querySelector('.modal__overlay').remove();
    }, 300);
  }
}
