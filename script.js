import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

const cities = [
    {name:"Amieirinha",population:4812946},
    {name:"Kinshasa",population:1027499},
    {name:"Blantyre",population:1992831},
    {name:"Pueblo Nuevo Viñas",population:6106658},
    {name:"Ko Si Chang",population:1258350},
    {name:"Rabak",population:5611054},
    {name:"Port-Cartier",population:2014142},
    {name:"Detroit",population:8927289},
    {name:"Medeiros Neto",population:6847563},
    {name:"Kushchëvskaya",population:4160962}
]

const svg = d3.select("svg"),
    margin = {top:20, right:20, bottom:50, left:60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


const x = d3.scaleBand()
    .domain(cities.map(d => d.name))
    .range([0, width])
    .padding(0.1);


const y = d3.scaleLinear()
    .domain([0, d3.max(cities, d => d.population)])
    .range ([height, 0]);

g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .style("text-anchor", "end");

g.append("g")
    .call(d3.axisLeft(y).ticks(6))
    .call(g => g.selectAll(".tick line")
        .attr("x2", width)
        .attr("stroke-opacity", 0.3));


g.selectAll("rect")
    .data(cities)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.population))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.population))
    .attr("fill", "purple");

d3.select("labels")
    .selectAll('text')
    .data(cities)
    .join("text")
    .attr("x", d => x(d.name) + x.bandwith() / 2)
    .attr("y", d => y(d.population) - 5)
    .attr('text-anchor', 'middle')
    .text(d => d.name);

