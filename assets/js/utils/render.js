import {parseISO, addDays, format} from 'date-fns';

const months = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}

function getGoogleCalendar(data) {
  const gcURL = new URL('https://calendar.google.com/calendar/render');
  const startStr = data.start.replace(/-/g, '');
  const endStr = data.end.replace(/-/g, '');
  gcURL.searchParams.append('action', 'TEMPLATE');
  gcURL.searchParams.append('text', data.name);
  gcURL.searchParams.append('dates', `${startStr}/${endStr}`);
  gcURL.searchParams.append('details', data.description || '');
  return gcURL.toString();
}

function createCalendar(event) {
  if (!event.dia_inicio) return;
  const year = new Date().getFullYear();
  const month = months[event['mes'].toLowerCase().trim()];
  const startDay = Number(event.dia_inicio);
  const startDate = parseISO(`${year}-${month}-${addLeadingZero(startDay)}`);
  let endDate;
  if ((event.dia_finalizacion && startDay === Number(event.dia_finalizacion)) || !event.dia_finalizacion) {
    endDate = addDays(startDate, 1);
  } else {
    endDate = parseISO(`${year}-${month}-${addLeadingZero(Number(event.dia_finalizacion))}`);
  }
  return {
    gc: getGoogleCalendar({
      name: event.nombre_evento,
      start: format(startDate, 'yyyy-MM-dd'),
      end: format(endDate, 'yyyy-MM-dd'),
      description: event.descripcion,
    }),
    ics: {
      title: event.nombre_evento,
      description: event.descripcion || '',
      start: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()],
      end: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
    },
  };
}

export const renderEvent = (parentEl, data, classNames = '') => {
  const calendar = createCalendar(data);
  // ${calendar ? `<p><button class="download-ics underline" data-ics='${JSON.stringify(calendar.ics || {})}'>Descargar .ics</button></p>` : ''}
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
            <img class="event__image-titulo" src="/images/eventos/nombre-evento.svg" alt="${data.nombre_evento}">
        </h3>
        <div class="text-purple">
            <p class="font-bold text-xl xl:text-2xl">
                ${data.dia_inicio || ''}
            </p>
            <p class="-mt-2">  
            ${data.mes}
            </p>
        </div>
        <p class="text-lg xl:text-xl">
            ${data.descripcion && data.descripcion.length >= 150 ? data.descripcion.slice(0, 150) + ' ...' : 'No hay descripcion'}
        </p>
        <div class="flex space-x-2">
            ${calendar ? `<p><a class="underline" target="_blank" href="${calendar.gc}">Agregar a Google Calendar</a></p>` : ''}
        </div>
        <button data-id="${data.id}" class="event__button" style="background-color: #C5296A;">Leer más</button>
    </div>
    <div class="event__container-right">
        ${data.thumbnail && `<img class="event__image" src="${data.thumbnail}" alt="" style="height: 365px;" />`}
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
              Fecha: ${new Intl.DateTimeFormat('es-CO', {dateStyle: 'full'}).format(new Date(data.fecha))}
          </p>
          <div class="publicaciones__text-right publicaciones--mt-2">
          ${files ? files.map((f) => `<a class="publicaciones__download" title="${f.title}" href="${f.url}" style="background-color: #C5296A;" download="${f.title}" target="_blank">Descargar</a>`) : ''}
          </div>
        </div>
    </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};

export const renderMultimedia = (parentEl, data, type) => {
  let html = '';
  if (data['tipo_multimedia'] === 'Video' && type === 'video' || data['tipo_multimedia'] === 'Audio' && type === 'audio') {
    html = `
    <div class="multimedia__item">
        <div class="relative">
            <img class="multimedia__image" src="${data.thumbnail}" alt="${data.nombre_galeria + 'image'}">
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
            <img class="multimedia__image" src="${data.thumbnail}" alt="${data.nombre_galeria + 'image'}">
            <button data-id="${data.id}" class="multimedia__button-galeria" href="#" style="background-color: #3A3C6A;">Ver galería</button>
            <div class="multimedia__type" style="background-color: #5F2161;">&nbsp;</div>
        </div>
        <div class="multimedia__details">
            <h3 class="multimedia__title">
            ${data.nombre_galeria}
            </h3>
            <p class="multimedia__description">
            ${data.descripcion}
            </p>
            <div class="multimedia__lugar-comunidad">
                <p class="italic">
                    ${data.municipio || ''} - ${(Array.isArray(data.departamento) ? [...new Set(data.departamento)].join(' - ') : data.departamento) || ''}
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
