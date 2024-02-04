class TextAnimation {
    constructor(options = {}) {
        this.text = options.text || "Default Text";
        this.p = createVector(options.x || 0, options.y || 0);
        this.s = options.size || 16;
        this.c = [
            red(options.color) || 0,
            green(options.color) || 0,
            blue(options.color) || 0,
            255
        ];
        this.inAnimationTime = options.inAnimationTime || 60;
        this.outAnimationTime = options.outAnimationTime || 60;
        this.animationTime = options.animationTime || 120;
        this.font = options.font || "Arial";
        this.inAnimation = options.inAnimation;
        this.outAnimation = options.outAnimation;

        this.d = createVector(0, 0);
        this.sadd = 0;

        this.t = 0;
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

    zoomOut(t) {
        const easeNum = pow(this.outTime / t, 2);
        this.c[3] = map(easeNum, 0, 1, 255, 0);
        this.sadd = map(easeNum, 0, 1, 0, -this.s);
    }

    move() {
        if (this.t < this.inAnimationTime) {
            if(this.inAnimation=="fadeIn"){
                this.fadeIn(this.inAnimationTime);
            } else if (this.inAnimation == "slideInLeft"){
                this.slideInLeft(this.inAnimationTime);
            } else if (this.inAnimation == "zoomIn"){
                this.zoomIn(this.inAnimationTime);
            } else {
                this.fadeIn(this.inAnimationTime);
            }
            this.inTime += deltaTime / 1000;
        }

        if (this.t > this.animationTime - this.outAnimationTime) {
            if(this.outAnimation=="fadeOut"){
                this.fadeOut(this.outAnimationTime);
            } else if (this.outAnimation == "slideOutLeft") {
                this.slideOutLeft(this.outAnimationTime);
            } else if (this.outAnimation == "zoomOut") {
                this.zoomOut(this.outAnimationTime);
            } else {
                this.fadeOut(this.outAnimationTime);
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
        textSize(this.s + this.sadd);
        fill(this.c);
        noStroke();
        text(this.text, this.p.x+this.d.x, this.p.y+this.d.y);
        pop();
    }
}