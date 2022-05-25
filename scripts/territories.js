const {writeFileSync} = require('fs');
const {join} = require('path');
const yaml = require('js-yaml');
const slugify = require('slugify');

const trrs = require('../data/territorios.json');

function createPath(folder, name) {
  return join(__dirname, `../content/${folder}/${name}.md`);
}

function splitList(input) {
  if (!input) return [];
  return input.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
}

trrs.forEach((trr) => {
  const filename = trr.municipio.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const total = trr.hombres_victimas_conflicto + trr.intersexuales_victimas_conflicto + trr.lgbt_victimas_conflicto + trr.mujeres_victimas_conflicto + trr.no_informa_victimas_conflicto;

  const communitySlug = trr.comunidad_focalizada ? slugify(trr.comunidad_focalizada, {
    lower: true,
    replacement: '-',
    remove: /[:,]/g,
  }).normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

  const fields = {
    title: trr.municipio,
    menu: {
      region: {
        parent: trr.region.toLowerCase().replace(/\s/g, '-').replace(/\,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      },
    },
    departamento: trr.departamento,
    description: trr.descripcion,
    grafica_ubicacion_geografica: `/charts/municipios/${filename}/ubicacion_geografica.html`,
    grafica_comunidades_focalizadas: `/charts/municipios/${filename}/comunidades_focalizadas.html`,
    grafica_poblacion_genero: `/charts/municipios/${filename}/poblacion_genero.html`,
    grafica_area_geografica_genero: `/charts/municipios/${filename}/area_geografica_genero.html`,
    grafica_pertenencia_etnica: `/charts/municipios/${filename}/pertenencia_etnica.html`,
    grafica_conflicto_identidad: `/charts/municipios/${filename}/conflicto_identidad.html`,
    grafica_violencia_sexual: `/charts/municipios/${filename}/violencia_sexual.html`,
    grafica_violencia_fisica: `/charts/municipios/${filename}/violencia_fisica.html`,
    grafica_violencia_psicologica: `/charts/municipios/${filename}/violencia_psicologica.html`,
    grafica_negligencia_abandono: `/charts/municipios/${filename}/negligencia_abandono.html`,
    ficha: `/fichas/${filename}/ficha.pdf`,
    centros_poblados_corregimientos: trr.centros_poblados_corregimiento?.split(','),
    distribucion_poblacional_hombres: trr.distribucion_poblacional_hombres,
    distribucion_poblacional_mujeres: trr.distribucion_poblacional_mujeres,
    poblacion_discapacidad: trr.poblacion_discapacidad,
    comunidades_etnicas_zona: trr.comunidades_etnicas_zona?.split(','),
    asentamientos_indigenas: trr.asentamientos_indigenas,
    resguardos_indigenas: trr.resguardos_indigenas,
    consejos_comunitarios: trr.consejos_comunitarios,
    total_poblacion_victima: total,
    num_sujetos_reparacion_colectiva: trr.num_sujetos_reparacion_colectiva,
    num_planes_retorno_reubicacion_colectiva: trr.num_planes_retorno_reubicacion_colectiva,
    territorio_entidades_snariv_sivjrnr: splitList(trr.territorio_entidades_snariv_sivjrnr),
    priorizacion_convivencia_social_salud_mental: trr.priorizacion_convivencia_social_salud_mental,
    region: trr.region,
    priorizacion_sexualidad_derechos_sexuales_reproductivos: trr.priorizacion_sexualidad_derechos_sexuales_reproductivos,
    priorizacion_gestion_diferencial_poblaciones_vulnerables: trr.priorizacion_gestion_diferencial_poblaciones_vulnerables,
    priorizacion_fortalecimiento_autoridad_sanitaria: trr.priorizacion_fortalecimiento_autoridad_sanitaria,
    eventos_salud_publica_predominantes: trr.eventos_salud_publica_predominantes?.split(','),
    rips_salud_mental_poblacion_general: trr.rips_salud_mental_poblacion_general?.split(','),
    servicios_telemedicina_mpio_depto: trr.servicios_telemedicina_mpio_depto?.split(','),
    total_pobreza_multidimensional: trr.total_pobreza_multidimensional,
    pobreza_multidimensional_urbano: trr.pobreza_multidimensional_urbano,
    pobreza_multidimensional_centro_poblado_rural_disperso: trr.pobreza_multidimensional_centro_poblado_rural_disperso,
    ppales_actividades_economicas: trr.ppales_actividades_economicas?.split(','),
    observaciones_ppales_actividades_economicas: trr.observaciones_ppales_actividades_economicas,
    ppal_vocacion_mpio: trr.ppal_vocacion_mpio?.split(','),
    observaciones_ppal_vocacion_mpio: trr.observaciones_ppal_vocacion_mpio,
    trabajo_informal: trr.trabajo_informal,
    ppal_uso_suelo: trr.ppal_uso_suelo?.split(','),
    observaciones_ppal_uso_suelo: trr.observaciones_ppal_uso_suelo,
    espacios_socio_comunitarios: trr.espacios_socio_comunitarios?.split(','),
    medios_comunicacion: trr.medios_comunicacion?.split(','),
    iniciativas_org_sociedad_civil: trr.iniciativas_org_sociedad_civil,
    programas_usaid: trr.programas_usaid?.split(','),
    comunidad_focalizada: trr.comunidad_focalizada,
    comunidad_focalizada_url: communitySlug,
  };
  let metadata = yaml.dump(fields);
  writeFileSync(createPath('territorios', filename), `---\n${metadata}\n---`);
  delete fields.menu;
  metadata = yaml.dump(fields);
  writeFileSync(createPath('reporte', filename), `---\n${metadata}\n---`);
});
