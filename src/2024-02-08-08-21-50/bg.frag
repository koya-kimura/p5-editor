precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D u_tex;

float PI=3.14159265358979;

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

float easeInOutSine(float x){
    return clamp(-.5*(cos(PI*x)-1.)+.1, .1, 1.);
}

void main(void){
    vec2 uv=vTexCoord;
    uv += vec2(random(uv))*0.05;

    vec4 col = texture2D(u_tex, uv);

    float gray = easeInOutSine((col.r+col.g+col.b)/3.);

    gl_FragColor= vec4(vec3(gray), 1.);
}