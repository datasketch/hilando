const { writeFileSync } = require('fs')
const { join } = require('path')
const yaml = require('js-yaml')

const trrs = require('../data/territorios.json')

trrs.slice(0, 10).forEach(trr => {
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
        territorio_entidades_snariv_sivjrnr: trr['territorio_entidades-snariv-sivjrnr'],
        priorizacion_convivencia_social_salud_mental: trr['priorizacion-convivencia-social-salud-mental'],
        region: trr.region,
        priorizacion_sexualidad_derechos_sexuales_reproductivos: trr['priorizacion-sexualidad-derechos-sexuales-reproductivos'],
        priorizacion_gestion_diferencial_poblaciones_vulnerables: trr['priorizacion-gestion-diferencial-poblaciones-vulnerables'],
        priorizacion_fortalecimiento_autoridad_sanitaria: trr['priorizacion-fortalecimiento-autoridad-sanitaria'],
        eventos_salud_publica_predominantes: trr['eventos-salud-publica-predominantes']

    })
    const frontmatter = `---\n${metadata}\n---`
    const pathToFile = join(__dirname, `../content/territorios/${trr.municipio.toLowerCase()}.md`)
    writeFileSync(pathToFile, frontmatter)
})