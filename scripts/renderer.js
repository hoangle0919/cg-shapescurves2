class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let red = [220, 40, 40, 255];
        let blue = [40, 90, 220, 255];

        this.drawBezierCurve({x: 100, y: 150}, {x: 220, y: 450},
                             {x: 420, y: 50}, {x: 660, y: 380},
                             this.num_curve_sections, red, framebuffer);

        this.drawBezierCurve({x: 180, y:  80}, {x: 330, y: 420},
                             {x: 520, y: 420}, {x: 700, y: 120},
                             this.num_curve_sections, blue, framebuffer);
    }



    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        let green = [30, 150, 90, 255];
        let orange = [230, 130, 20, 255];
        let purple = [130, 60, 190, 255];

        this.drawCircle({x: 280, y: 300}, 140, this.num_curve_sections, green, framebuffer);
        this.drawCircle({x: 560, y: 380}, 80, this.num_curve_sections, orange, framebuffer);
        this.drawCircle({x: 600, y: 180}, 50, this.num_curve_sections, purple, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        let teal = [0, 128, 128, 255];
        let magenta = [190, 50, 140, 255];

        let pentagon = [
            {x: 230, y: 420},
            {x: 344, y: 337},
            {x: 300, y: 203},
            {x: 160, y: 203},
            {x: 116, y: 337}
        ];

        let heptagon = [
            {x: 570, y: 420},
            {x: 664, y: 375},
            {x: 687, y: 273},
            {x: 622, y: 192},
            {x: 518, y: 192},
            {x: 453, y: 273},
            {x: 476, y: 375}
        ];

        this.drawConvexPolygon(pentagon, teal, framebuffer);
        this.drawConvexPolygon(heptagon, magenta, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        let ink = [30, 30, 40, 255];
        let accent = [200, 60, 60, 255];
        let grass = [45, 95, 60, 255];
        let rock_near = [95, 105, 125, 255];
        let rock_far = [75, 85, 105, 255];
        let sun_color = [250, 190, 60, 255];

        this.drawConvexPolygon([{x: 0, y: 0}, {x: 800, y: 0}, {x: 800, y: 70}, {x: 0, y: 70}], grass, framebuffer);
        this.drawConvexPolygon([{x: 40, y: 70}, {x: 200, y: 185}, {x: 360, y: 70}], rock_near, framebuffer);
        this.drawConvexPolygon([{x: 300, y: 70}, {x: 470, y: 175}, {x: 640, y: 70}], rock_far, framebuffer);
        this.drawConvexPolygon([{x: 600, y: 70}, {x: 700, y: 150}, {x: 790, y: 70}], rock_near, framebuffer);

        let sun = {x: 700, y: 500};
        this.drawCircle(sun, 55, this.num_curve_sections, sun_color, framebuffer);
        for (let i = 0; i < 8; i++) {
            let a = i * Math.PI / 4;
            let ray0 = {x: Math.round(sun.x + 65 * Math.cos(a)), y: Math.round(sun.y + 65 * Math.sin(a))};
            let ray1 = {x: Math.round(sun.x + 85 * Math.cos(a)), y: Math.round(sun.y + 85 * Math.sin(a))};
            this.drawLine(ray0, ray1, sun_color, framebuffer);
            if (this.show_points) {
                this.drawVertex(ray0, [0, 0, 0, 255], framebuffer);
                this.drawVertex(ray1, [0, 0, 0, 255], framebuffer);
            }
        }

        this.drawBezierCurve({x: 110, y: 520}, {x: 125, y: 545},
                             {x: 145, y: 545}, {x: 160, y: 520},
                             this.num_curve_sections, ink, framebuffer);
        this.drawBezierCurve({x: 160, y: 520}, {x: 175, y: 545},
                             {x: 195, y: 545}, {x: 210, y: 520},
                             this.num_curve_sections, ink, framebuffer);
        this.drawBezierCurve({x: 270, y: 555}, {x: 282, y: 572},
                             {x: 298, y: 572}, {x: 310, y: 555},
                             this.num_curve_sections, ink, framebuffer);
        this.drawBezierCurve({x: 310, y: 555}, {x: 322, y: 572},
                             {x: 338, y: 572}, {x: 350, y: 555},
                             this.num_curve_sections, ink, framebuffer);

        this.drawConvexPolygon([{x: 115, y: 200}, {x: 140, y: 200}, {x: 140, y: 400}, {x: 115, y: 400}], ink, framebuffer);
        this.drawConvexPolygon([{x: 180, y: 200}, {x: 205, y: 200}, {x: 205, y: 400}, {x: 180, y: 400}], ink, framebuffer);
        this.drawConvexPolygon([{x: 140, y: 285}, {x: 180, y: 285}, {x: 180, y: 315}, {x: 140, y: 315}], ink, framebuffer);

        this.drawCircle({x: 295, y: 300}, 45, this.num_curve_sections, accent, framebuffer);

        this.drawLine({x: 385, y: 200}, {x: 430, y: 400}, ink, framebuffer);
        this.drawLine({x: 430, y: 400}, {x: 475, y: 200}, ink, framebuffer);
        this.drawLine({x: 403, y: 267}, {x: 457, y: 267}, ink, framebuffer);

        this.drawLine({x: 505, y: 200}, {x: 505, y: 400}, ink, framebuffer);
        this.drawLine({x: 505, y: 400}, {x: 595, y: 200}, ink, framebuffer);
        this.drawLine({x: 595, y: 200}, {x: 595, y: 400}, ink, framebuffer);

        this.drawBezierCurve({x: 727, y: 338}, {x: 700, y: 385},
                             {x: 645, y: 380}, {x: 640, y: 300},
                             this.num_curve_sections, accent, framebuffer);
        this.drawBezierCurve({x: 640, y: 300}, {x: 635, y: 220},
                             {x: 700, y: 208}, {x: 727, y: 255},
                             this.num_curve_sections, accent, framebuffer);
        this.drawLine({x: 727, y: 255}, {x: 727, y: 295}, accent, framebuffer);
        this.drawLine({x: 727, y: 295}, {x: 697, y: 295}, accent, framebuffer);

        if (this.show_points) {
            let line_points = [
                {x: 385, y: 200}, {x: 430, y: 400}, {x: 475, y: 200},
                {x: 403, y: 267}, {x: 457, y: 267},
                {x: 505, y: 200}, {x: 505, y: 400}, {x: 595, y: 200}, {x: 595, y: 400},
                {x: 727, y: 255}, {x: 727, y: 295}, {x: 697, y: 295}
            ];
            for (let i = 0; i < line_points.length; i++) {
                this.drawVertex(line_points[i], [0, 0, 0, 255], framebuffer);
            }
        }
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        let point_color = [0, 0, 0, 255];
        let control_color = [0, 160, 255, 255];

        let points = [];
        for (let i = 0; i <= num_edges; i++) {
            let t = i / num_edges;

            let x = Math.pow(1 - t, 3) * p0.x
                + 3 * Math.pow(1 - t, 2) * t * p1.x
                + 3 * (1 - t) * t * t * p2.x
                + t * t * t * p3.x;

            let y = Math.pow(1 - t, 3) * p0.y
                + 3 * Math.pow(1 - t, 2) * t * p1.y
                + 3 * (1 - t) * t * t * p2.y
                + t * t * t * p3.y;

            points.push({x: Math.round(x), y: Math.round(y)});
        }

        for (let i = 0; i < num_edges; i++) {
            this.drawLine(points[i], points[i + 1], color, framebuffer);
        }

        if (this.show_points) {
            for (let i = 0; i < points.length; i++) {
                this.drawVertex(points[i], point_color, framebuffer);
            }
            this.drawVertex(p1, control_color, framebuffer);
            this.drawVertex(p2, control_color, framebuffer);
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        let point_color = [0, 0, 0, 255];
        let step = (2 * Math.PI) / num_edges;

        let corners = [];
        for (let i = 0; i < num_edges; i++) {
            let angle = i * step;
            corners.push({
                x: Math.round(center.x + radius * Math.cos(angle)),
                y: Math.round(center.y + radius * Math.sin(angle))
            });
        }

        for (let i = 0; i < num_edges; i++) {
            this.drawLine(corners[i], corners[(i + 1) % num_edges], color, framebuffer);
        }

        if (this.show_points) {
            for (let i = 0; i < num_edges; i++) {
                this.drawVertex(corners[i], point_color, framebuffer);
            }
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        let point_color = [0, 0, 0, 255];

        for (let i = 1; i < vertex_list.length - 1; i++) {
            this.drawTriangle(vertex_list[0], vertex_list[i], vertex_list[i + 1],
                              color, framebuffer);
        }

        if (this.show_points) {
            for (let i = 0; i < vertex_list.length; i++) {
                this.drawVertex(vertex_list[i], point_color, framebuffer);
            }
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        let size = 3;
        let x = Math.round(v.x);
        let y = Math.round(v.y);
        this.drawLine({x: x - size, y: y - size}, {x: x + size, y: y + size}, color, framebuffer);
        this.drawLine({x: x - size, y: y + size}, {x: x + size, y: y - size}, color, framebuffer);
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
