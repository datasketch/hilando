const {writeFileSync} = require('fs');
const {join} = require('path');
const yaml = require('js-yaml');
const slugify = require('slugify');

const data = require('../data/comunidades-focalizadas.json');

data.forEach((item) => {
  const filename = slugify(item.nombre_comunidad, {
    lower: true,
    replacement: '-',
    remove: /[:,]/g,
  }).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const metadata = yaml.dump({
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
    notas_infraestructura_comunitaria: item.notas_infraestructura_comunitaria?.split('.'),
    liderazgo_comunidad: item.liderazgo_comunidad?.split('.'),
    inclusion_diversidad_genero: item.inclusion_diversidad_genero,
    comentarios_conectividad: item.comentarios_conectividad,
    punto_SOLE: item.punto_sole,
    comentarios_punto_SOLE: item.comentarios_punto_sole?.split('.'),
    ppales_actividades_economicas_vocacion_productiva: item.ppales_actividades_economicas_vocacion_productiva?.split(','),
    comentarios_ppales_actividades_economicas_vocacion_productiva: item.comentarios_ppales_actividades_economicas_vocacion_productiva?.split(','),
    comunidad_sostenible_uso_suelo: item.comunidad_sostenible_uso_suelo,
    org_con_proyeccion: item.org_con_proyeccion?.split(','),
    servicios_publicos_comunidades_focalizadas: item.servicios_publicos_comunidades_focalizadas?.split(','),
    comunidades_focalizadas_educacion_infraestructura_educativa: item.comunidades_focalizadas_educacion_infraestructura_educativa?.split(','),
    comunidades_focalizadas_practicas_organizativas: item.comunidades_focalizadas_practicas_organizativas?.split(','),
    conectividad_minima: item.conectividad,
    iniciativas_priorizadas: item.iniciativas_productivas_priorizadas?.split(','),
    org_focalizada: item.org_focalizada?.split(','),
    riesgo: item.riesgo,
    otros_programas_USAID: item.otros_programas_usaid?.split(','),
    alianzas_colaboradores_1: item.posibilidad_iniciativas_conjuntas_aliados_2?.split(','),
    alianzas_colaboradores_2: item.posibilidad_iniciativas_conjuntas_aliados_2?.split(','),
    actividades_ocio: item.actividades_ocio?.split(','),
    medios_comunicacion_narrativas_locales: item.medios_comunicacion_narrativas_locales?.split(','),
    num_visitas_realizadas: item.num_visitas_realizadas,
    num_diagnosticos_rurales_participativos_realizados: item.num_diagnosticos_rurales_participativos_realizados,
    infraestructura_salud_atencion_psicosocial: item.infraestructura_salud_atencion_psicosocial?.split(','),
    notas_infraestructura_salud_atencion_psicosocial: item.notas_infraestructura_salud_atencion_psicosocial,
    num_visitas_predio: item.num_visitas_predio,
    url: `/comunidad-focaliza/${filename}`,
    layout: 'comunidad',
  });
  const frontmatter = `---\n${metadata}\n---`;
  const pathToFile = join(__dirname, `../content/comunidad-focalizada/${filename}.md`);
  writeFileSync(pathToFile, frontmatter);
});
