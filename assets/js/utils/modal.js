/* eslint-disable no-unused-vars */
export default class Modal {
  // constructor
  constructor(data, modalSection = 'eventos') {
    this.data = data;
    this.modalSection = modalSection;
    this._openModal();

    // event handlers

    // Close Modal
    document.querySelector('.modal__button-close').addEventListener('click', this._closeModal);

    document
        .querySelector('.modal__overlay')
        .addEventListener('click', this._closeModal);

    window.addEventListener('keydown', (e) => {
      try {
        if (e.key === 'Escape') {
          this._closeModal();
        }
      } catch (error) { }
    });
  }

  // methods
  #renderImageSwiperSlide(urlImages, nameImages = 'image', opc = '') {
    let html = '';
    if (opc === 'thumbs') {
      urlImages.forEach((urlImage, index) => {
        html += `
          <div class="swiper-slide">
            <img class="swiper__image--thumbs" src="${urlImage}" alt="${nameImages}-${index + 1}">
           </div>
          `;
      });
    } else if (opc === 'events') {
      urlImages.forEach((urlImage, index) => {
        html += `
              <div class="swiper-slide">
                <img class="swiper__image--events" src="${urlImage}" alt="${nameImages}-${index + 1}" style="max-width: 622px; max-height: 350.27px;">
               </div>
              `;
      });
    } else if (opc === 'multimedia') {
      urlImages.forEach((urlImage, index) => {
        html += `
              <div class="swiper-slide">
                <img class="swiper__image--multimedia" src="${urlImage}" alt="${nameImages}-${index + 1}">
               </div>
              `;
      });
    }
    return html;
  }

  // render modal

  _renderModal() {
    let html = '';
    if (this.modalSection === 'eventos') {
      html = `
        <div class="modal modal--events">
        <div class="modal__button-close">
            X
        </div>
        <div class="event__modal-panel">
            <div class="event__modal--flex-justify">
                <div class="event__modal-left" style="max-width: 71px;">
                    <!-- Slider main container -->
                    <div thumbsSlider="" class="swiper swiperThumbs swiperThumbs--events" style="max-height: 350.27px;">
                        <!-- Additional required wrapper -->
                        <div class="swiper-wrapper">
                            <!-- Slides -->
                            ${this.data.foto.length > 0 ? this.#renderImageSwiperSlide(this.data.foto, this.data.nombre_evento, 'thumbs') : this.#renderImageSwiperSlide([this.data.thumbnail], this.data.nombre_evento, 'thumbs')}
                        </div>
                    </div>
                </div>
                <div class="event__modal-right" style="max-width: 622px;">
                    <div class="event__modal--space-y-5">
                        <div class="event__modal--space-y-2">
                            <div class="event__modal--flex-justify">
                                <div class="event__modal--flex-center event__modal--space-x-3">
                                    <img src="/images/eventos/icon-location.svg" alt="location icon">
                                    <p class="event__modal-paragraph">
                                        ${this.data.comunidad}, ${this.data.municipio}
                                    </p>
                                </div>
                                <div class="event__modal--flex-center event__modal--space-x-2">
                                    <img src="/images/eventos/calendar.svg" alt="calendar icon">
                                    <p class="event__modal-paragraph text-purple font-medium italic">
                                        ${this.data.mes}
                                    </p>
                                </div>
                            </div>
                            <div class="event__modal-flex-responsive">
                                <div>
                                    <h3 class="event__modal-title">
                                        ${this.data.nombre_evento}
                                    </h3>
                                </div>
                                <div>
                                    <p class="event__modal-italic">
                                        <span class="event__modal--text-purple">
                                            Tipo de evento:
                                        </span>
                                        ${this.data.tipo_evento ? this.data.tipo_evento : 'Sin definir'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <!-- Slider main container -->
                            <div class="swiper swiperMain">
                                <!-- Additional required wrapper -->
                                <div class="swiper-wrapper">
                                    <!-- Slides -->
                                    ${this.data.foto.length > 0 ? this.#renderImageSwiperSlide(this.data.foto, this.data.nombre_evento, 'events') : this.#renderImageSwiperSlide([this.data.thumbnail], this.data.nombre_evento, 'events')}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>
                                ${this.data.descripcion}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal__overlay">
        &nbsp;
    </div>
        `;
    } else if (this.modalSection === 'multimedia') {
      html = `
      <div class="modal modal--events">
        <div class="modal__button-close">
            X
        </div>
        <div class="pt-12 pb-6">
                    <div class="space-y-6 px-8 pb-6">
                        <!-- Slider main container -->
                        <div class="swiper mySwiper2">
                            <!-- Additional required wrapper -->
                            <div class="swiper-wrapper">
                                <!-- Slides -->
                                ${this.#renderImageSwiperSlide(this.data['galeria_images'], this.data.nombre_galeria, 'multimedia')}
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
                                ${this.#renderImageSwiperSlide(this.data['galeria_images'], this.data.nombre_galeria, 'thumbs')}
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
      </div>
      <div class="modal__overlay">
          &nbsp;
      </div>
        `;
    }
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
