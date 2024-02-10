precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_prevTex;

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
    // uv = floor(uv*200.)/200.;

    vec4 col = texture2D(u_prevTex, uv);
    vec4 precol = texture2D(u_tex, uv);

    float d = sqrt(pow(col.r-precol.r, 2.)+pow(col.g-precol.g,2.)+pow(col.b-precol.b, 2.));

    vec2 newuv = uv;
    if(d < .05){
        col.rgb=vec3(0);
    } else if(d < .1) {
        col.rgb=vec3(1.,0.,0.);
    } else if(d < .15){
        col.rgb=vec3(0.,1.,0.);
    } else {
        col.rgb=vec3(0.,0.,1.);
    }

    gl_FragColor = col;
}