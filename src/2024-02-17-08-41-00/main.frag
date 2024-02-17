precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform vec2 u_dir;
uniform sampler2D u_tex;

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

void main(void) {
    vec2 uv = vTexCoord;
    uv+=u_dir*random(uv)*(.5-abs(u_time-.5))*.7;

    vec4 col = texture2D(u_tex, uv);
    col.rgb *= abs(u_time-.5)+.5;

    gl_FragColor = col;
}