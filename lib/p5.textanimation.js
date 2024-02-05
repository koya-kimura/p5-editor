class TextAnimation {
    constructor(options = {}) {
        this.text = options.text || "Default Text";
        this.p = createVector(options.x || 0, options.y || 0);
        this.s = options.size || 20;
        this.c = [
            red(options.color) || 0,
            green(options.color) || 0,
            blue(options.color) || 0,
            0
        ];
        this.inAnimationTime = options.inAnimationTime || 0.5;
        this.outAnimationTime = options.outAnimationTime || 0.5;
        this.animationStartTime = options.animationStartTime || 0;
        this.animationTime = options.animationTime || 2;
        this.font = options.font || "Arial";
        this.inAnimation = options.inAnimation || "none";
        this.outAnimation = options.outAnimation || "none";
        this.mode = options.mode || "CENTER";

        this.d = createVector(0, 0);
        this.sadd = 0;

        this.t = -this.animationStartTime;
        this.inTime = 0;
        this.outTime = 0;
        this.end = false;
    }

    fadeIn(t) {
        const easeNum = pow(this.inTime / t, 2);
        this.c[3] = map(easeNum, 0, 1, 0, 255);
    }

    // 100が固定値になってる
    slideInLeft(t) {
        const easeNum = pow(this.inTime / t, 2);
        this.d.x = map(easeNum, 0, 1, -100, 0);
        this.c[3] = map(easeNum, 0, 1, 0, 255);
    }

    slideInRight(t) {
        const easeNum = pow(this.inTime / t, 2);
        this.d.x = map(easeNum, 0, 1, 100, 0);
        this.c[3] = map(easeNum, 0, 1, 0, 255);
    }

    slideInUp(t) {
        const easeNum = pow(this.inTime / t, 2);
        this.d.y = map(easeNum, 0, 1, 100, 0);
        this.c[3] = map(easeNum, 0, 1, 0, 255);
    }

    slideInDown(t) {
        const easeNum = pow(this.inTime / t, 2);
        this.d.x = map(easeNum, 0, 1, -100, 0);
        this.c[3] = map(easeNum, 0, 1, 0, 255);
    }

    zoomIn(t) {
        const easeNum = pow(this.inTime / t, 2);
        this.c[3] = map(easeNum, 0, 1, 0, 255);
        this.sadd = map(easeNum, 0, 1, -this.s, 0);
    }

    // outはイージング他のいる
    fadeOut(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
    }

    slideOutLeft(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.d.x = map(easeNum, 0, 1, 0, -100);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
    }

    slideOutRight(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.d.x = map(easeNum, 0, 1, 0, 100);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
    }

    slideOutUp(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.d.x = map(easeNum, 0, 1, 0, -100);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
    }

    slideOutDown(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.d.x = map(easeNum, 0, 1, 0, 100);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
    }

    zoomOut(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
        this.sadd = map(easeNum, 0, 1, 0, -this.s);
    }

    move() {
        if (0 < this.t && this.t < this.inAnimationTime) {
            if(this.inAnimation=="fadeIn"){
                this.fadeIn(this.inAnimationTime);
            } else if (this.inAnimation == "slideInLeft"){
                this.slideInLeft(this.inAnimationTime);
            } else if (this.inAnimation == "slideInRight") {
                this.slideInRight(this.inAnimationTime);
            } else if (this.inAnimation == "slideInUp") {
                this.slideInUp(this.inAnimationTime);
            } else if (this.inAnimation == "slideInDown") {
                this.slideInDown(this.inAnimationTime);
            } else if (this.inAnimation == "zoomIn") {
                this.zoomIn(this.inAnimationTime);
            }
            this.inTime += deltaTime / 1000;
        }

        if (this.t > this.animationTime - this.outAnimationTime) {
            if(this.outAnimation=="fadeOut"){
                this.fadeOut(this.outAnimationTime);
            } else if (this.outAnimation == "slideOutLeft") {
                this.slideOutLeft(this.outAnimationTime);
            } else if (this.outAnimation == "slideOutRight") {
                this.slideOutRight(this.outAnimationTime);
            } else if (this.outAnimation == "slideOutUp") {
                this.slideOutUp(this.outAnimationTime);
            } else if (this.outAnimation == "slideOutDown") {
                this.slideOutDown(this.outAnimationTime);
            } else if (this.outAnimation == "zoomOut") {
                this.zoomOut(this.outAnimationTime);
            } 
            this.outTime += deltaTime / 1000;
        }

        this.t += deltaTime / 1000;

        this.end = this.t > this.animationTime;
    }

    display() {
        push();
        textFont(this.font);
        textAlign(CENTER);
        if(this.mode=="CORNER"){
            translate(-(this.s*this.text.length)*0.5, -this.s*0.5);
        }
        textSize(this.s + this.sadd);
        fill(this.c);
        noStroke();
        text(this.text, this.p.x+this.d.x, this.p.y+this.d.y);
        pop();
    }
}