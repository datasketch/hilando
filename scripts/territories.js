const { writeFileSync } = require('fs')
const { join } = require('path')
const yaml = require('js-yaml')

const trrs = require('../data/territorios.json')

trrs.forEach(trr => {
    const metadata = yaml.dump({
        title: trr.municipio,
        departamento: trr.departamento,
        description: trr.descripcion,
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
        comunidad_focalizada: trr['comunidad-focalizada'].split(',')
    })
    const frontmatter = `---\n${metadata}\n---`
    const pathToFile = join(__dirname, `../content/territorios/${trr.municipio.toLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.md`)
    writeFileSync(pathToFile, frontmatter)
})