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

export const renderEvent = (parentEl, data) => {
  const calendar = createCalendar(data);
  const html = `
    <div class="event__item" style="background-color: #F0F0F2; box-shadow: 0px 6px 11px #00305766;">
    <div class="event__container-left">
        <span class="event__municipio-departamento">
            ${data.municipio || ''} - ${data.macroregion || ''}
        </span>
        <h3 class="event__titulo">
            <span class="event__nombre">
            ${data.nombre_evento}
            </span>
            <img class="event__image-titulo" src="/images/eventos/nombre-evento.svg" alt="nombre evento">
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
            ${calendar ? `<p><button class="download-ics underline" data-ics='${JSON.stringify(calendar.ics || {})}'>Descargar .ics</button></p>` : ''}
        </div>
        <button data-id="${data.id}" class="cursor-pointer inline-block uppercase py-2 px-6 font-semibold text-white absolute bottom-0 left-0" style="background-color: #D27028;">Leer más</button>
    </div>
    <div class="event__container-right">
        <img class="event__image" src="${data.thumbnail}" alt="prueba" style="height: 365px;">
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
