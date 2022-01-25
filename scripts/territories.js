const {writeFileSync} = require('fs');
const {join} = require('path');
const yaml = require('js-yaml');

const trrs = require('../data/territorios.json');

function createPath(folder, name) {
  return join(__dirname, `../content/${folder}/${name}.md`);
}

trrs.forEach((trr) => {
  const filename = trr.municipio.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    centros_poblados_corregimientos: trr['centros-poblados-corregimiento'].split(','),
    distribucion_poblacional_hombres: trr['distribucion-poblacional-hombres'],
    distribucion_poblacional_mujeres: trr['distribucion-poblacional-mujeres'],
    poblacion_discapacidad: trr['poblacion-discapacidad'],
    comunidades_etnicas_zona: trr['comunidades-etnicas-zona'].split(','),
    asentamientos_indigenas: trr['asentamientos-indigenas'],
    resguardos_indigenas: trr['resguardos-indigenas'],
    consejos_comunitarios: trr['consejos-comunitarios'],
    total_poblacion_victima: trr['total-poblacion-victima'],
    num_sujetos_reparacion_colectiva: trr['num-sujetos-reparacion-colectiva'],
    num_planes_retorno_reubicacion_colectiva: trr['num-planes-retorno-reubicacion-colectiva'],
    territorio_entidades_snariv_sivjrnr: trr['territorio_entidades-snariv-sivjrnr'].split(','),
    priorizacion_convivencia_social_salud_mental: trr['priorizacion-convivencia-social-salud-mental'],
    region: trr.region,
    priorizacion_sexualidad_derechos_sexuales_reproductivos: trr['priorizacion-sexualidad-derechos-sexuales-reproductivos'],
    priorizacion_gestion_diferencial_poblaciones_vulnerables: trr['priorizacion-gestion-diferencial-poblaciones-vulnerables'],
    priorizacion_fortalecimiento_autoridad_sanitaria: trr['priorizacion-fortalecimiento-autoridad-sanitaria'],
    eventos_salud_publica_predominantes: trr['eventos-salud-publica-predominantes'].split(','),
    rips_salud_mental_poblacion_general: trr['rips-salud-mental-poblacion-general'].split(','),
    servicios_telemedicina_mpio_depto: trr['servicios-telemedicina-mpio-depto'].split(','),
    total_pobreza_multidimensional: trr['total-pobreza-multidimensional'],
    pobreza_multidimensional_urbano: trr['pobreza-multidimensional-urbano'],
    pobreza_multidimensional_centro_poblado_rural_disperso: trr['pobreza-multidimensional-centro-poblado-rural-disperso'],
    ppales_actividades_economicas: trr['ppales-actividades-economicas'].split(','),
    observaciones_ppales_actividades_economicas: trr['observaciones-ppales-actividades-economicas'],
    ppal_vocacion_mpio: trr['ppal-vocacion-mpio'].split(','),
    observaciones_ppal_vocacion_mpio: trr['observaciones-ppal-vocacion-mpio'],
    trabajo_informal: trr['trabajo-informal'],
    ppal_uso_suelo: trr['ppal-uso-suelo'].split(','),
    observaciones_ppal_uso_suelo: trr['observaciones-ppal-uso-suelo'],
    espacios_socio_comunitarios: trr['espacios-socio-comunitarios'].split(','),
    medios_comunicacion: trr['medios-comunicacion'].split(','),
    iniciativas_org_sociedad_civil: trr['iniciativas-org-sociedad-civil'],
    programas_usaid: trr['programas-usaid'].split(','),
    comunidad_focalizada: trr['comunidad-focalizada'].split(','),
  };
  let metadata = yaml.dump(fields);
  writeFileSync(createPath('territorios', filename), `---\n${metadata}\n---`);
  delete fields.menu;
  metadata = yaml.dump(fields);
  writeFileSync(createPath('reporte', filename), `---\n${metadata}\n---`);
});
