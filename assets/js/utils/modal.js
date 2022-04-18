export default class Modal {
  // constructor
  constructor(data) {
    this.data = data;
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

  // render modal
  _renderModal() {
    const html = `
    <div class="modal">
    <div class="modal__button-close">
        X
    </div>
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
        <img class="event__image" src="${this.data.imagen}" alt="prueba">
        <a class="inline-block uppercase py-2 px-4 font-semibold text-white absolute bottom-0 right-0" href="http://localhost:1313/galeria/multimedia/" style="background-color: #D27028;">Ver galería</a>
    </div>
  </div>
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
