precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
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

vec3 easeInOutSineVec3(vec3 v){
    return vec3(easeInOutSine(v.x), easeInOutSine(v.y), easeInOutSine(v.z));
}

void main(void){
    vec2 uv=vTexCoord;

    vec2 newUv = (uv-.5)*2.;
    newUv*=(1.-length(newUv)*.05)*1.05;

    vec2 p = newUv/2.+.5;

    vec3 sum = vec3(0, 0, 0);

    for(int i=1; i<20; i++){
        vec4 defaltCol=texture2D(u_tex,p);
        float gray = (defaltCol.r + defaltCol.g + defaltCol.b)/3.;

        vec2 offset = abs(gray-.5) < .45 ? vec2(random(vec2(float(i))), random(vec2(float(i*2)))) * .01 : vec2(0, 0);

        vec4 col=texture2D(u_tex,p+offset);

        col.rgb = easeInOutSineVec3(col.rgb);

        col.r*=mix(0.,1.,u_time);
        col.g*=mix(0.,.97,u_time);
        col.b*=mix(0.,.9,u_time);

        sum += col.rgb/20.;
    }

    gl_FragColor= vec4(sum, 1.);
}