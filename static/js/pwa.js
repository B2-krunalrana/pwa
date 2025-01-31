function createSmoothChart() {
    console.log("createSmoothChart fucntion call")
    // Dummy data
    const data = [
        { date: "2023-01-01", students: 4, teacher: 45 },
        { date: "2023-02-01", students: 500, teacher: 55 },
        { date: "2023-03-01", students: 60, teacher: 65 },
        { date: "2023-04-01", students: 7, teacher: 75 },
        { date: "2023-05-01", students: 800, teacher: 85 },
        { date: "2023-06-01", students: 90, teacher: 95 }
    ];

    // Set up the SVG canvas dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    // Create the SVG container
    const svg = d3.select("#chart-test")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    // Parse the date
    const parseDate = d3.timeParse("%Y-%m-%d");

    // Define scales
    const x = d3.scaleTime()
                .domain(d3.extent(data, d => parseDate(d.date)))
                .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => Math.max(d.students, d.teacher))])
                .nice()
                .range([height - margin.bottom, margin.top]);

    // Define line generators
    const lineStudents = d3.line()
                           .x(d => x(parseDate(d.date)))
                           .y(d => y(d.students))
                           .curve(d3.curveBasis); // Smooth curve

    const lineTeacher = d3.line()
                          .x(d => x(parseDate(d.date)))
                          .y(d => y(d.teacher))
                          .curve(d3.curveBasis); // Smooth curve

    // Append the lines to the SVG with animation
    svg.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "blue")
       .attr("stroke-width", 2)
       .attr("d", lineStudents)
       .attr("stroke-dasharray", function() {
           return this.getTotalLength();
       })
       .attr("stroke-dashoffset", function() {
           return this.getTotalLength();
       })
       .transition()
       .duration(1500)
       .ease(d3.easeCubicInOut)
       .attr("stroke-dashoffset", 0); // Animation to reveal the line

    svg.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "green")
       .attr("stroke-width", 2)
       .attr("d", lineTeacher)
       .attr("stroke-dasharray", function() {
           return this.getTotalLength();
       })
       .attr("stroke-dashoffset", function() {
           return this.getTotalLength();
       })
       .transition()
       .duration(1500)
       .ease(d3.easeCubicInOut)
       .attr("stroke-dashoffset", 0); // Animation to reveal the line

    // Add the X axis
    svg.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    // Add the Y axis
    svg.append("g")
       .attr("transform", `translate(${margin.left},0)`)
       .call(d3.axisLeft(y));

    // Add labels for the axes
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height - margin.bottom + 30)
       .attr("text-anchor", "middle")
       .text("Date");

    svg.append("text")
       .attr("x", -height / 2)
       .attr("y", margin.left - 40)
       .attr("transform", "rotate(-90)")
       .attr("text-anchor", "middle")
       .text("Value");

    // Add a legend
    svg.append("text")
       .attr("x", width - 100)
       .attr("y", 40)
       .attr("fill", "blue")
       .text("Students");

    svg.append("text")
       .attr("x", width - 100)
       .attr("y", 60)
       .attr("fill", "green")
       .text("Teacher");
}

