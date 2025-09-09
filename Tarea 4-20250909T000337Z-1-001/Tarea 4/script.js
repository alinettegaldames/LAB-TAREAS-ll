import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

const projection=d3.geoMercator()
 .fitSize([500,500],data)

 const path= d3.geoPath(projection)
 

 const colorScale = d3.scaleSequential()
  .domain(d3.extent(data.features, d => d.properties.poblacion))
  .interpolator(d3.interpolateOranges) // aqui es donde cambiamos el color para que se realice una escala segun la cantidad de poblacion solo cambiamos la ultima palabra que
                                    // que seria Oranges, si la cambiamos por Rainbow cambiara los colores.
                                    // Colores que se pueden poner: Rainbow, Sinebow, Warm, Cool, Viridis, Inferno, Magma, Plasma, Cividis, Turbo, Greens, Greys, Purples, Reds

 d3.select('.mapa')
  .selectAll('path')
  .data(data.features)
  .join('path')
  .attr('d', path)
  .attr('fill', d => colorScale(d.properties.poblacion || 0)) //accede el valor de poblacion por comuna para darle una escala de color 
  .attr('stroke-width', 0.5)
  .attr('stroke','black')

  const etiqueta = d3.select('body').append('div')
      .classed('etiqueta', true)
  
  d3.select('.mapa').selectAll('path')
      .on('mouseenter', (e, d) => {
          etiqueta.style('opacity', 1)
          etiqueta.style('top', e.pageY + 10 + 'px') //esta es la posicion vertical para seguir el cursol (tooltip)
          etiqueta.style('left', e.pageX + 10 + 'px') // esta es la posicion horizontal para seguir el cursol (tooltip)
          etiqueta.html(`<p>${d.properties.Comuna}<p>`) //accede al valor de la comuna osea la dimension 
      })
      .on('mouseout', (e, d) => {
          etiqueta.style('opacity', 0)
      })

      

  
  

  