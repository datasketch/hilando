const {writeFileSync} = require('fs');
const {join} = require('path');
const yaml = require('js-yaml');
const slugify = require('slugify');

const data = require('../data/comunidades-focalizadas.json');

function createPath(folder, name) {
  return join(__dirname, `../content/${folder}/${name}.md`);
}

function splitList(input) {
  if (!input) return [];
  return input.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
}

data.forEach((item) => {
  const filename = slugify(item.nombre_comunidad, {
    lower: true,
    replacement: '-',
    remove: /[:,]/g,
  }).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const fields = {
    title: item.nombre_comunidad,
    nombre_comunidad: item.nombre_comunidad,
    municipio: item.municipio,
    departamento: item.departamento,
    descripcion: item.descripcion,
    num_personas: +item.num_personas !== 0 ? item.num_personas : 0,
    num_familias: +item.num_familias !== 0 ? item.num_familias : 0,
    min_distancia_casco_urbano: item.min_distancia_casco_urbano,
    km_distancia_casco_urbano: item.km_distancia_casco_urbano,
    vias_acceso: item.vias_acceso,
    infraestructura_comunitaria: item.infraestructura_comunitaria,
    notas_infraestructura_comunitaria: splitList(item.notas_infraestructura_comunitaria),
    liderazgo_comunidad: splitList(item.liderazgo_comunidad),
    inclusion_diversidad_genero: item.inclusion_diversidad_genero,
    comentarios_conectividad: item.comentarios_conectividad,
    punto_SOLE: item.punto_sole,
    comentarios_punto_SOLE: splitList(item.comentarios_punto_sole),
    ppales_actividades_economicas_vocacion_productiva: splitList(item.ppales_actividades_economicas_vocacion_productiva),
    comentarios_ppales_actividades_economicas_vocacion_productiva: splitList(item.comentarios_ppales_actividades_economicas_vocacion_productiva),
    comunidad_sostenible_uso_suelo: item.comunidad_sostenible_uso_suelo,
    org_con_proyeccion: splitList(item.org_con_proyeccion),
    servicios_publicos_comunidades_focalizadas: splitList(item.servicios_publicos_comunidades_focalizadas),
    comunidades_focalizadas_educacion_infraestructura_educativa: splitList(item.comunidades_focalizadas_educacion_infraestructura_educativa),
    comunidades_focalizadas_practicas_organizativas: splitList(item.comunidades_focalizadas_practicas_organizativas),
    conectividad_minima: item.conectividad,
    iniciativas_priorizadas: splitList(item.iniciativas_productivas_priorizadas),
    org_focalizada: splitList(item.org_focalizada),
    riesgo: item.riesgo,
    otros_programas_USAID: splitList(item.otros_programas_usaid),
    alianzas_colaboradores_1: splitList(item.posibilidad_iniciativas_conjuntas_aliados_2),
    alianzas_colaboradores_2: splitList(item.posibilidad_iniciativas_conjuntas_aliados_2),
    actividades_ocio: splitList(item.actividades_ocio),
    medios_comunicacion_narrativas_locales: splitList(item.medios_comunicacion_narrativas_locales),
    num_visitas_realizadas: item.num_visitas_realizadas,
    num_diagnosticos_rurales_participativos_realizados: item.num_diagnosticos_rurales_participativos_realizados,
    infraestructura_salud_atencion_psicosocial: splitList(item.infraestructura_salud_atencion_psicosocial),
    notas_infraestructura_salud_atencion_psicosocial: item.notas_infraestructura_salud_atencion_psicosocial,
    num_visitas_predio: item.num_visitas_predio,
    url: `/comunidad-focalizada/${filename}`,
    layout: 'single',
    download_file: `/reportes/${filename}.pdf`,
  };
  let metadata = yaml.dump(fields);
  writeFileSync(createPath('comunidad-focalizada', filename), `---\n${metadata}\n---`);
  fields.url = `/reportes/${filename}`;
  fields.layout = 'comunidad';
  metadata = yaml.dump(fields);
  writeFileSync(createPath('reportes', filename), `---\n${metadata}\n---`);
});
