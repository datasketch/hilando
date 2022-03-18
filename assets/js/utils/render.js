export const renderEvent = (parentEl, data) => {
  const html = `
    <div class="event__item" style="background-color: #F0F0F2;">
        <span class="event__place">${data.municipio}, ${data.departamento}</span>
        <img class="w-full" src="/images/eventos/sticky.svg" alt="sticky">
        <h3 class="event__title" style="color: #963B62;">
            ${data.titulo}
        </h3>
        <div class="aspect-w-16 aspect-h-9 mt-2">
          <img class="object-scale-down" src="${data.imagen}"/>
        </div>
        <span class="event__month" style="color: #963B62;">
            ${data.mes.charAt(0).toUpperCase() + data.mes.substr(1)}
        </span>
        <span class="event__type">
            Tipo: ${data.tipo}
        </span>
    </div>
    `;
  parentEl.insertAdjacentHTML('beforeend', html);
};
