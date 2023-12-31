precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
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

    // uv.x += sin(u_time+uv.y*10.)*.2;

    uv = abs(uv-.5) + sin(u_time)*.3;
    uv=abs(uv-.5)+cos(u_time+1.)*.3;
    uv=abs(uv-.5)+cos(u_time+2.)*.3;
    uv=abs(uv-.5)+cos(u_time+3.)*.3;

    vec4 col = texture2D(u_tex, uv);

    vec2 uvR = uv+vec2(0.002);
    col.r = texture2D(u_tex,uvR).r;

    vec2 uvG=uv-vec2(.002);
    col.g=texture2D(u_tex,uvG).g;

    if(mod(u_time, 20.) < 10.){
        col.rgb = vec3(1.) - col.rgb;
    }

    gl_FragColor = col;
}