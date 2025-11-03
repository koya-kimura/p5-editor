precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
uniform float u_progress;

float PI = 3.14159265358979;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

mat2 rot(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

float atan2(float y,float x){
    return x==0.?sign(y)*PI/2.:atan(y,x);
}

vec2 xy2pol(vec2 xy){
    return vec2(atan2(xy.y,xy.x),length(xy));
}

vec2 pol2xy(vec2 pol){
    return pol.y*vec2(cos(pol.x),sin(pol.x));
}

float map(float value,float min1,float max1,float min2,float max2){
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

void main(void) {
    vec2 uv = vTexCoord;

    uv -= vec2(0.5);
    uv *= 0.7;
    uv += vec2(0.5);
    
    uv += vec2(random(uv * 10973.0) * map(abs(u_progress - 0.5), 0.5, 0.0, 0.0, 0.1) - 0.05, random(uv * 74019.0)*map(abs(u_progress-.5),.5,0.,0.,.1)-.05);

    float mosaicScl = floor(map(random(vec2(floor(uv.x * 16.0), floor(uv.y * 9.0))), 0.0, 1.0, 1.0, 5.0)) * map(abs(u_progress-.5),.5,0.,2.0, 1.0);
    uv = vec2(floor(uv.x * (16.0 * mosaicScl) + 0.5) / (16.0 * mosaicScl), floor(uv.y*(9.0 * mosaicScl)+.5)/(9.0 * mosaicScl));

    vec4 col = texture2D(u_tex, uv);

    gl_FragColor = col;
}