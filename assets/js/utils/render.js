import {getDrivePreviewImage, getDriveVideoID, getVideoPlatform, getYouTubePreviewImage, getYouTubeVideoID} from '.';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

export const renderEvent = (parentEl, data, classNames = '') => {
  const html = `
    <div class=${`'event__item ${classNames}'`} style="background-color: #F0F0F2; box-shadow: 0px 6px 11px #00305766;">
    <div class="event__container-left">
        <span class="event__municipio-departamento">
            ${data.municipio || ''} - ${data.macroregion || ''}
        </span>
        <h3 class="event__titulo">
            <span class="event__nombre">
            ${data.nombre_evento}
            </span>
            <img class="event__image-titulo" src="/images/eventos/nombre-evento.svg" alt="${data.nombre_evento
}">
        </h3>
        <div class="text-purple flex items-center gap-x-1">
            <p class="font-bold text-xl xl:text-2xl">
                ${data.dia_inicio || ''}
            </p>
            <p>  
            ${data.mes || ''}
            </p>
            <p>${data.anio || ''}</p>
        </div>
        <p class="text-lg xl:text-xl">
            ${data.descripcion && data.descripcion.length >= 150 ?
      data.descripcion.slice(0, 150) + ' ...' :
      'No hay descripcion'
}
        </p>
        <button data-id="${data.id
}" class="event__button" style="background-color: #C5296A;">Leer más</button>
    </div>
    <div class="event__container-right">
        ${data.thumbnail &&
    `<img class="event__image" src="${data.thumbnail}" alt="" style="height: 365px;" />`
}
    </div>
  </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const renderPublicaciones = (parentEl, data) => {
  const files = data.archivo_pdf || [];
  const html = `
      <div class="publicaciones__item">
        <div>
          <p class="publicaciones__tema">
          ${data.tema}
          </p>
          <div class="publicaciones--mt-4">
              <img class="w-full" src="/images/galeria/publicaciones/sticky.svg" alt="sticky">
          </div>
          <h3 class="publicaciones__nombre-publicacion publicaciones---mt-8">
          ${data.nombre_publicacion}
          </h3>
        </div>
        <p class="publicaciones__descripcion publicaciones--mt-4">
        ${data.descripcion}
        </p>
        <div>
          <p class="publicaciones__fecha publicaciones--mt-4">
              Fecha: ${new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'full',
  }).format(new Date(data.fecha))}
          </p>
          <div class="publicaciones__text-right publicaciones--mt-2">
          ${files ?
      files.map(
          (f) =>
            `<a class="publicaciones__download" title="${f.title}" href="${f.url}" style="background-color: #C5296A;" download="${f.title}" target="_blank">Descargar</a>`,
      ) :
      ''
}
          </div>
        </div>
    </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const getPreviewImage = (url) => {
  const videoPlatform = getVideoPlatform(url);

  if (videoPlatform === 'Unknown') return;

  if (videoPlatform === 'YouTube') {
    const id = getYouTubeVideoID(url);
    const previewImage = getYouTubePreviewImage(id);
    return previewImage;
  }

  if (videoPlatform === 'Google Drive') {
    const id = getDriveVideoID(url);
    const previewImage = getDrivePreviewImage(id);
    return previewImage;
  }
};

export const renderMultimedia = (parentEl, data, type) => {
  let html = '';
  if (
    (data['tipo_multimedia'] === 'Video' && type === 'video') ||
    (data['tipo_multimedia'] === 'Audio' && type === 'audio')
  ) {
    html = `
    <div class="multimedia__item">
        <div class="relative">
            ${data.thumbnail ?
        `<img class="multimedia__image" src="${data.thumbnail
        }" alt="${data.nombre_galeria + 'image'}">` :
        `<img class="multimedia__image" src="${getPreviewImage(data.enlace_video_audio[0])}" alt="${data.nombre_galeria + 'image'}">`
}
            <button data-id="${data.id}" class="multimedia__button-play">
                <img src="/images/public/button-play.svg" alt="button play">
            </button>
            <div class="multimedia__type" style="background-color: #D27028;">&nbsp;</div>
        </div>
        <div class="multimedia__details">
            <h3 class="multimedia__title">
                ${data.nombre_galeria}
            </h3>
            <p class="multimedia__description">
                ${data.descripcion.substring(0, 120) + '...'}
            </p>
            <div class="multimedia__lugar-comunidad">
                <p class="italic">
                ${data.municipio || ''} - ${data.departamento || ''}
                </p>
                <p class="text-space-cadet">
                ${data.comunidad_focalizada || ''}
                </p>
            </div>
        </div>
    </div>
    `;
  } else if (data['tipo_multimedia'] === 'Fotografía') {
    html = `
    <div class="multimedia__item">
        <div class="relative">
            <img class="multimedia__image" src="${data.thumbnail}" alt="${data.nombre_galeria + 'image'
}">
            <button data-id="${data.id
}" class="multimedia__button-galeria" href="#" style="background-color: #3A3C6A;">Ver galería</button>
            <div class="multimedia__type" style="background-color: #5F2161;">&nbsp;</div>
        </div>
        <div class="multimedia__details">
            <h3 class="multimedia__title">
            ${data.nombre_galeria}
            </h3>
            <p class="multimedia__description">
            ${data.descripcion || ''}
            </p>
            <div class="multimedia__lugar-comunidad">
                <p class="italic">
                    ${data.municipio || ''} - ${(Array.isArray(data.departamento) ?
        [...new Set(data.departamento)].join(' - ') :
        data.departamento) || ''
}
                <p class="text-space-cadet">
                    ${data.comunidad_focalizada || ''}
                </p>
            </div>
        </div>
    </div>
    `;
  }
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const renderNews = (parentEl, data) => {
  const html = `
            <div
              class="news__item"
            >
              <img
                class="news__image"
                src="${data.image}"
                alt="${data.title}"
              />
              <span class="news__date"
                >Fecha: ${format(
      new Date(data.date),
      'dd \'de\' MMMM \'de\' yyyy',
      {locale: es},
  )}</span
              >
              <h3
                class="news__title"
              >
                ${data.title}
              </h3>
              <p
                class="news__description"
              >
               ${data.description}
              </p>
              <a
                class="news__link"
                href="${data.link}"
                >VER TODO</a
              >
              <img
                class="news__sticky"
                src="/images/public/sticky.svg"
                alt="sticky"
              />
            </div>
  `;
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const renderLearn = (parentEl, data) => {
  const enlacesVideo = data.enlace_video.trim().split(',');

  const html = `
<div class="learn__item">
  <p class="learn__topic">
    ${data.tema}
  </p>
  <img class="learn__sticky" src="/images/aprende/sticky.svg" alt="sticky">
  <h3 class="learn__title">${data.nombre_de_la_publicacion}</h3>
  ${data.enlace_video &&
    `
      <div class="learn__image">
        <img src="${getPreviewImage(enlacesVideo[Math.floor(Math.random() * enlacesVideo.length)])}" alt="${data.nombre_de_la_publicacion} image" />
      </div>
    `
}
  <p class="learn__description">${data.descripcion}</p>
  <div class="learn__date">
    <p>Fecha: ${format(
      new Date(data.fecha),
      'dd \'de\' MMMM \'de\' yyyy',
      {locale: es},
  )}</p>
    <button data-id="${data.Id}" class="learn__view-more">Ver más</button>
  </div>
</div>
  `;

  parentEl.insertAdjacentHTML('beforeend', html);
};
