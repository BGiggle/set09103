app.controller("platformController", [ "$scope","dataService", function ($scope, dataService) {
	        
    var platforms = [];
    function getPlatforms(){
        dataService.getPlatforms().$promise.then(function(s){
            platforms = [];
            for(var i = 0; i < s.platforms.length; i++){
                var p = s.platforms[i];
                
                for(var a in p){
                    if(p[a] == "None"){
                        p[a] = null
                    }                        
                }
                
                delete p.description  
                delete p.deck                
                
                p.company = angular.fromJson(p.company)
                p.image = angular.fromJson(p.image)
    
                platforms.push(p);                               
            }
        $scope.platforms = platforms

        localStorage.platforms = angular.toJson(platforms)
        
        })
    }

    if(localStorage.platforms){
        $scope.platforms = platforms = angular.fromJson(localStorage.platforms)
    }else{
        getPlatforms();
    }
    
    $scope.visulisations = ["Install Base", "Original Price", "By Company"];
    
    $scope.changeDisplay = function(newDisplay){
     
        switch (newDisplay){
            case "Install Base":
                drawBubbleChart("install_base", "Install Base");
                break;
            case "Original Price":            
                drawBubbleChart("original_price", "Original Price");
                break;
            case "By Company":            
                drawByCompanyChart("install_base", "Install base");
                break;
        }
                
    }
    
    var el = document.getElementById("d3Canvas")
    var height = window.innerHeight - el.offsetTop - 20;
    var width = window.innerWidth - 200;
    
    function formatBigNumbers(number){
        number = number + "";
        var result = "";
        var count = 0;
        for(var i = number.length -1; i >= 0; i--){
            if(count%3 == 0){
                if(result[0] != "."){
                    result = ","+result
                }                
            }
            result =  number[i] + result
            count++
        }
        result = result.substring(0, result.length-1)
        return result
    }
    

    
    function drawByCompanyChart(propToChart, displayString, groupBy){
        
    var w = 1280,
        h = 800,
        r = 720,
        x = d3.scale.linear().range([0, r]),
        y = d3.scale.linear().range([0, r]),
        node,
        root;
    
    var pack = d3.layout.pack()
        .size([r, r])
        .value(function(d) { return d[propToChart] || 10; })
    
    var vis = d3.select("body").insert("svg:svg", "h2")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

    
        var datat = d3.nest()
            .key(function(d){ if(d.company) {return d.company.name} return "unknown"})
            .entries(platforms)
        
        for(k in datat){
            datat[k].name = datat[k].key
            datat[k].children = datat[k].values
        }
        
        var data = {
            name : "flare",
            children: datat
        }
        
        console.log(data)
        
        node = root = data;
    
        var nodes = pack.nodes(root);
        
        vis.selectAll("circle")
            .data(nodes)
            .enter().append("svg:circle")
            .attr("class", function(d) { return d.children ? "parent" : "child"; })
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", function(d) { return d.r; })
            .on("click", function(d) { return zoom(node == d ? root : d); }).append("title")
        
        vis.selectAll("text")
            .data(nodes)
            .enter().append("svg:text")
            .attr("class", function(d) { return d.children ? "parent" : "child"; })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
            .text(function(d) { return  d.name + " " + formatBigNumbers(d.value); });
            
        d3.select(window).on("click", function() { zoom(root); });

    function zoom(d, i) {
        var k = r / d.r / 2;
        x.domain([d.x - d.r, d.x + d.r]);
        y.domain([d.y - d.r, d.y + d.r]);
        
        var t = vis.transition()
            .duration(d3.event.altKey ? 7500 : 750);
        
        t.selectAll("circle")
            .attr("cx", function(d) { return x(d.x); })
            .attr("cy", function(d) { return y(d.y); })
            .attr("r", function(d) { return k * d.r; });
        
        t.selectAll("text")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });
        
        node = d;
        d3.event.stopPropagation();
        }

    

    }
    

    
    function drawBubbleChart(propToChart, displayString){

        d3.select("svg").remove();
        var svg = d3.select("#d3Canvas").append("svg")
            .attr("width", width)
            .attr("height", height);
            
        var color = d3.scale.quantize()
            .range(["#64BA64","#4FB14F","#459C45","#475292","#3D477D","#3D477D"]);
            
        color.domain(d3.extent(platforms, function(d) { return d[propToChart]; }));
        
        var pack = d3.layout.pack()
            .sort(null)
            .size([width, height])
            .value(function(d) { 
                if(d[propToChart]) {
                    return d[propToChart];
                }
                return 0;})
            .padding(5);
        
        svg.selectAll("circle")
        .data(pack.nodes({children : platforms}).slice(1))
            .enter().append("circle")
                .attr("r", function(d) { return d.r; })
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .style("fill", function(d) { return color(d[propToChart]); })
             .append("title")
                .text(function(d){return d.name + " " +displayString + ": " + formatBigNumbers(d[propToChart])})
            
    
        }
    }
]);