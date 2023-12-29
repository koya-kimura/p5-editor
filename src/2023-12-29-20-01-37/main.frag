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

    if(sin(u_time) > 0.){
        uv=abs(uv-.5);
    }

    if(sin(u_time+1.)>0.){
        uv = fract(uv*5.);
    }

    vec4 col = texture2D(u_tex, uv);

    if(sin(u_time+2.)>0.){
        float gray = (col.r + col.g + col.b) / 3.;
        gray = floor(pow(gray, 1.3)*10.)/10.;
        col.rgb = vec3(gray);
    }

    if(u_vol>.5){
        col.rgb = vec3(1.) - col.rgb;
    }

    col.rgb+=vec3(random(uv)-.5)*.05 + 0.05;

    gl_FragColor = col;
}