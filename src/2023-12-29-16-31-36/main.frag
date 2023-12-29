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
    float t = mod(u_time, 50.);

    vec2 uv = vTexCoord;

    //ミラー
    if(sin(u_time + 1.) + cos(u_time + 1.5) >.1){
        uv=abs(uv-.5);
    }

    if(sin(u_time+2.) +cos(u_time+2.5) >.95){
        uv.x = .5;
    }

    if(sin(u_time+3.) +cos(u_time+3.5) >.5){
        uv = floor(uv*1000.)/1000.;
    }

    vec4 col =  texture2D(u_tex, uv);

    // 色反転 色ずらし
    if(sin(u_time) > 0.9 && t > 20.){
        col.rgb=vec3(1.)-col.rgb;
    }  else {
        vec2 uvB=vec2(uv.x-.005,uv.y-.005);
        col.b=texture2D(u_tex,uvB).b;
    }

    // ノイズ
    col.rgb += vec3(random(uv) - 0.5) * 0.4;

    gl_FragColor = col;
}