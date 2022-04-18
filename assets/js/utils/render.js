export const renderEvent = (parentEl, data) => {
  const html = `
    <div class="event__item" style="background-color: #F0F0F2; box-shadow: 0px 6px 11px #00305766;">
    <div class="event__container-left">
        <span class="event__municipio-departamento">
            ${data.municipio} - ${data.departamento}
        </span>
        <h3 class="event__titulo">
            <span class="event__nombre">
            ${data.titulo}
            </span>
            <img class="event__image-titulo" src="/images/eventos/nombre-evento.svg" alt="nombre evento">
        </h3>
        <div class="text-purple">
            <p class="font-bold text-xl xl:text-2xl">
                02
            </p>
            <p class="-mt-2">  
            ${data.mes}
            </p>
        </div>
        <p class="text-lg xl:text-xl">
            ${data.descripcion.length >= 150 ? data.descripcion.slice(0, 150) + ' ...' : data.descripcion }
        </p>
        <button data-id="${data.id}" class="cursor-pointer inline-block uppercase py-2 px-6 font-semibold text-white absolute bottom-0 left-0" href="#" style="background-color: #D27028;">Leer más</button>
    </div>
    <div class="event__container-right">
        <img class="event__image" src="${data.imagen}" alt="prueba" style="height: 365px;">
        <a class="inline-block uppercase py-2 px-4 font-semibold text-white absolute bottom-0 right-0" href="http://localhost:1313/galeria/multimedia/" style="background-color: #D27028;">Ver galería</a>
    </div>
  </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};
