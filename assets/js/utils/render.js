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
            ${data.descripcion.length >= 150 ? data.descripcion.slice(0, 150) + ' ...' : data.descripcion}
        </p>
        <button data-id="${data.id}" class="cursor-pointer inline-block uppercase py-2 px-6 font-semibold text-white absolute bottom-0 left-0" href="#" style="background-color: #D27028;">Leer más</button>
    </div>
    <div class="event__container-right">
        <img class="event__image" src="${data.imagen}" alt="prueba" style="height: 365px;">
        <a class="inline-block uppercase py-2 px-4 font-semibold text-white absolute bottom-0 right-0" href="#" style="background-color: #D27028;">Ver galería</a>
    </div>
  </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const renderPublicaciones = (parentEl, data) => {
  const html = `
    <div class="publicaciones__item">
        <div class="publicaciones__municipio-comunidad">
            <p>
                ${data.municipio}
            </p>
            <p>
                ${data.comunidad}   
            </p>
        </div>
        <div class="px-3">
            <img class="w-full" src="/images/galeria/publicaciones/sticky.svg" alt="sticky">
        </div>
        <div class="publicaciones__details">
            <h3 class="publicaciones__title">
                ${data.titulo}
            </h3>
            <p class="publicaciones__description">
                ${data.descripcion}
            </p>
            <div class="publicaciones__autor-fecha">
                <div class="italic">
                    <p>
                        Autor: ${data.autor}
                    </p>
                    <p>
                        Fecha: ${data.fecha['mes'] + ' ' + data.fecha['dia'] + ' del ' + data.fecha['anio']}
                    </p>
                </div>
                <div>
                    <a class="publicaciones__download" href="${data.url}" style="background-color: #D27028;">Descargar</a>
                </div>
            </div>
        </div>
    </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const renderMultimedia = (parentEl, data) => {
  let html = '';
  if (data['tipo_multimedia'] === 'Video') {
    html = `
    <div class="multimedia__item">
        <div class="relative">
            <img src="/images/galeria/multimedia/prueba.jpg" alt="prueba">
            <button class="multimedia__button-play">
                <img src="/images/public/button-play.svg" alt="button play">
            </button>
            <div class="multimedia__type" style="background-color: #D27028;">&nbsp;</div>
        </div>
        <div class="multimedia__details">
            <h3 class="multimedia__title">
                ${data.titulo}
            </h3>
            <p class="multimedia__description">
                ${data.descripcion}
            </p>
            <div class="multimedia__lugar-comunidad">
                <p class="italic">
                ${data.municipio} - ${data.departamento}
                </p>
                <p class="text-space-cadet">
                ${data.comunidad}
                </p>
            </div>
        </div>
    </div>
    `;
  } else if (data['tipo_multimedia'] === 'Fotografía') {
    html = `
    <div class="multimedia__item">
        <div class="relative">
            <img src="/images/galeria/multimedia/prueba-2.jpg" alt="prueba">
            <button data-id="${data.id}" class="multimedia__button-galeria" href="#" style="background-color: #81A347;">Ver galería</button>
            <div class="multimedia__type" style="background-color: #5F2161;">&nbsp;</div>
        </div>
        <div class="multimedia__details">
            <h3 class="multimedia__title">
            ${data.titulo}
            </h3>
            <p class="multimedia__description">
            ${data.descripcion}
            </p>
            <div class="multimedia__lugar-comunidad">
                <p class="italic">
                    ${data.municipio} - ${data.departamento}
                </p>
                <p class="text-space-cadet">
                    ${data.comunidad}
                </p>
            </div>
        </div>
    </div>
    `;
  }
  parentEl.insertAdjacentHTML('beforeend', html);
};
