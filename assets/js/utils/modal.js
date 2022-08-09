export default class Modal {
  // constructor
  constructor(data, modalSection = 'eventos') {
    this.data = data;
    this.modalSection = modalSection;
    this._openModal();
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.lastFocusedElement = document.activeElement;

    const modal = document.querySelector('.modal');
    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll(focusableSelectors);
    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];

    // event handlers

    // Close Modal
    document.querySelector('.modal__button-close').addEventListener('click', this._closeModal);

    document
        .querySelector('.modal__overlay')
        .addEventListener('click', this._closeModal);

    window.addEventListener('keydown', this.keyboardHandler);
  }

  keyboardHandler(e) {
    const isTab = e.key === 'Tab';
    const isEsc = e.key === 'Escape';

    if (isEsc) {
      this._closeModal();
      return;
    }

    if (!isTab) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        this.firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }

  // methods
  #renderImageSwiperSlide(urlImages, nameImages = 'image', opc = '') {
    let html = '';
    if (opc === 'thumbs') {
      urlImages.forEach((urlImage, index) => {
        html += `
          <div class="swiper-slide swiper-slide--thumbs">
            <img class="swiper__image--thumbs" src="${urlImage}" alt="${nameImages}-${index + 1}">
           </div>
          `;
      });
    } else if (opc === 'events') {
      urlImages.forEach((urlImage, index) => {
        html += `
              <div class="swiper-slide">
                <div class="aspect-w-16 aspect-h-9">
                    <img class="object-contain object-center" src="${urlImage}" alt="${nameImages}-${index + 1}">
                </div>
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
    if (this.modalSection === 'eventos' || this.modalSection === 'evento') {
      html = `
        <div class="modal modal--events">
          <button class="modal__button-close" aria-label="Cerrar">
            X
          </button>
          <div class="event__modal-panel">
            <div class="event__modal--flex-justify">
              <div class="event__modal-left ${this.data.foto.length > 1 ? 'visible' : 'invisible'}" style="max-width: 71px;">
                <!-- Slider main container -->
                <button class="swiper-button-prev-events" aria-label="Imagen anterior">
                  <img src="/images/public/right-arrow.svg" alt="arrow slider" />
                </button>
                <div thumbsSlider="" class="swiper swiperThumbs swiperThumbs--events" style="max-height: 350.27px;">
                  <!-- Additional required wrapper -->
                  <div class="swiper-wrapper">
                    <!-- Slides -->
                    ${this.data.foto.length > 0 ? this.#renderImageSwiperSlide(this.data.foto, this.data.nombre_evento, 'thumbs') : this.#renderImageSwiperSlide([this.data.thumbnail], this.data.nombre_evento, 'thumbs')}
                  </div>
                </div>
                <button class="swiper-button-next-events" aria-label="Imagen siguiente">
                  <img src="/images/public/right-arrow.svg" alt="arrow slider" />
                </button>
              </div>
              <div class="event__modal-right" style="max-width: 622px;">
                <div class="event__modal--space-y-5">
                  <div class="event__modal--space-y-2">
                    <div class="event__modal--flex-justify">
                      <div class="event__modal--flex-center event__modal--space-x-3 ${this.data.comunidad || this.data.comunidad_focalizada ? '' : 'hidden'}">
                        <img src="/images/eventos/icon-location.svg" alt="location icon">
                        <p class="event__modal-paragraph">
                          ${this.data.comunidad || this.data.comunidad_focalizada}, ${this.data.municipio}
                        </p>
                      </div>
                    </div>
                    <div class="event__modal-flex-responsive">
                      <div>
                        <h3 class="event__modal-title">
                          ${this.data.nombre_evento || this.data.nombre_galeria}
                        </h3>
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
                  <p>${this.data.descripcion ? this.data.descripcion : ''}</p>
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
    } else if (this.modalSection === 'fotografia') {
      html = `
        <div class="modal modal--events">
          <button class="modal__button-close" aria-label="Cerrar">
              X
          </button>
          <div class="event__modal-panel">
            <div class="event__modal--flex-justify">
              <div class="event__modal-left ${!!this.data.foto.length ? 'visible' : 'invisible'}" style="max-width: 71px;">
                <!-- Slider main container -->
                <button class="swiper-button-prev-events" aria-label="Imagen anterior">
                  <img src="/images/public/right-arrow.svg" alt="arrow slider" />
                </button>
                <div thumbsSlider="" class="swiper swiperThumbs swiperThumbs--events" style="max-height: 350.27px;">
                  <!-- Additional required wrapper -->
                  <div class="swiper-wrapper">
                    <!-- Slides -->
                    ${this.data.foto.length > 0 ? this.#renderImageSwiperSlide(this.data.foto, this.data.titulo_multimedia, 'thumbs') : this.#renderImageSwiperSlide([this.data.thumbnail], this.data.nombre_galeria, 'thumbs')}
                  </div>
                </div>
                <button class="swiper-button-next-events" aria-label="Imagen siguiente">
                  <img src="/images/public/right-arrow.svg" alt="arrow slider" />
                </button>
              </div>
              <div class="event__modal-right" style="max-width: 622px;">
                <div class="event__modal--space-y-5">
                  <div class="event__modal--space-y-2">
                    <div class="event__modal--flex-justify">
                      <div class="event__modal--flex-center event__modal--space-x-3 ${this.data.departamento ? '' : 'hidden'}">
                        <img src="/images/eventos/icon-location.svg" alt="location icon">
                        <p class="event__modal-paragraph">
                          ${this.data.departamento || ''}, ${this.data.municipio || ''}
                        </p>
                      </div>
                    </div>
                    <div class="event__modal-flex-responsive">
                      <div>
                        <h3 class="event__modal-title">
                          ${this.data.nombre_galeria}
                        </h3>
                      </div>
                    </div>
                  </div>
                <div>
                  <!-- Slider main container -->
                  <div class="swiper swiperMain">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                      <!-- Slides -->
                        ${this.data.foto.length > 0 ? this.#renderImageSwiperSlide(this.data.foto, this.data.titulo_multimedia, 'thumbs') : this.#renderImageSwiperSlide([this.data.thumbnail], this.data.nombre_galeria, 'thumbs')}
                    </div>
                  </div>
                </div>
                <div>
                  <p>${this.data.descripcion}</p>
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
    } else if (this.modalSection === 'video') {
      html = `
        <div class="modal modal--video">
          <button class="modal__button-close" aria-label="Cerrar">
            X
          </button>
          <div class="video">
            <div class="video__left">
              &nbsp;
            </div>
            <div class="video__right">
              <div class="video--space-y-8">
                <div>
                  <div class="video--flex video--items-center video--space-x ${this.data.comunidad_focalizada ? '' : 'hidden'}">
                    <div>
                      <img src="/images/eventos/icon-location.svg" alt="location icon" />
                    </div>
                    <div>
                    <p class="video--text-purple video--italic">
                      ${this.data.comunidad_focalizada}, ${this.data.municipio}
                    </p>
                  </div>
                </div>
                <div class="video--flex video--justify-between video--items-center">
                  <div>
                    <h3 class="video--font-size-22 video--font-bold">
                      ${this.data.nombre_galeria}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="video--w-full">
                <video controls>
                  <source src="${this.data.enlace_video_audio}" type="video/mp4">
                </video>
              </div>
              <div>
                <p>${this.data.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__overlay">
        &nbsp;
      </div>
    `;
    } else if (this.modalSection === 'audio') {
      html = `
            <div class="modal modal--video">
            <div class="modal__button-close">
                X
            </div>
            <div class="video">
              <div class="video__left">
                  &nbsp;
              </div>
              <div class="video__right">
                  <div class="video--space-y-8">
                      <div>
                          <div class="video--flex video--items-center video--space-x ${this.data.comunidad ? '' : 'hidden'}">
                              <div>
                                  <img src="/images/eventos/icon-location.svg" alt="location icon" />
                              </div>
                              <div>
                                  <p class="video--text-purple video--italic">
                                      ${this.data.comunidad}, ${this.data.municipio}
                                  </p>
                              </div>
                          </div>
                          <div class="video--flex video--justify-between video--items-center">
                              <div>
                                  <h3 class="video--font-size-22 video--font-bold">
                                      ${this.data.nombre_evento}
                                  </h3>
                              </div>
                              <div>
                                  <p class="video--text-purple video--italic">
                                      ${this.data.tipo_multimedia}
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div class="video--w-full">
                      <audio src="${this.data.enlace_video_audio}" controls></audio>
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
    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal__overlay');
    setTimeout(() => {
      modal.classList.add('modal--active');
      modalOverlay.classList.add('modal__overlay--active');
    }, 100);
    setTimeout(() => {
      this.firstFocusableElement.focus();
    }, 150);
  }

  // close modal
  _closeModal() {
    document.querySelector('.modal').classList.remove('modal--active');
    document.querySelector('.modal__overlay').classList.remove('modal__overlay--active');

    setTimeout(() => {
      document.querySelector('.modal').remove();
      document.querySelector('.modal__overlay').remove();
      this.lastFocusedElement.focus();
    }, 300);

    window.removeEventListener('keydown', this.keyboardHandler);
  }
}
