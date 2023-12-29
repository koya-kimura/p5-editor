precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform float u_vol;
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

    if(u_vol>.2 && sin(u_time*5.) + cos(u_time+7.) > 0.){
        uv=abs(uv-.5)+.5;
    }

    if(u_vol>.2 && sin(u_time*8.) + cos(u_time*11.)>.5){
        float n = floor(pow(abs(cos(u_time)), 3.)*7.)+1.;
        uv = fract(uv*n);
    }

    if(u_vol>.6 &&sin(u_time+9.)+cos(u_time+6.)>0.){
        uv.x = .5;
        uv.y = floor(uv.y*300.)/300.;
    }

    if(u_vol>.55&&sin(u_time+6.)+cos(u_time+7.)>0.){
        uv.y += sin(uv.x*50. + u_time)*0.1;
    }

    vec4 col = texture2D(u_tex, uv);

    col.rgb+=vec3(random(uv)-.5)*.05 + 0.05;

    col.rgb+=vec3(step(.9997-pow(u_vol, 2.)*.001, random(vec2(uv.x, uv.y+u_time))));
    col.rgb+=vec3(step(.9997-pow(u_vol,2.)*.001,random(vec2(uv.x, u_time)))*.3);
    col.rgb+=vec3(step(.9997-pow(u_vol,2.)*.001,random(vec2(u_time, uv.y)))*.2);

    if(u_vol>.15){
        col.rgb=vec3(1.)-col.rgb;
    }

    col.rgb=floor(col.rgb*(floor(u_vol*5.+3.)+8.))/(floor(u_vol*5.+3.)+8.);

    gl_FragColor = col;
}