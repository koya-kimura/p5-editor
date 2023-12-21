precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
uniform float u_white;
uniform float u_black;
uniform float u_distortion;

float pi = 3.14159265358979;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(void) {
    vec2 uv = vTexCoord;

    uv -= vec2(0.5);
    uv*=(1.-length(uv)*u_distortion)*1.5;
    uv*= 0.5;
    uv+=vec2(.5);

    vec4 col=texture2D(u_tex,uv);

    col.rgb += vec3(u_white);
    col.rgb -= vec3(u_black);

    if(abs(sin(uv.y+u_time)) > 0.9995){
        vec2 uvR = vec2(uv.x + random(vec2(uv.x+u_time, uv.y+u_time)) * 0.005, uv.y+random(vec2(uv.x+u_time,uv.y+u_time))*.005);
        col.rgb = texture2D(u_tex,uvR).rgb;
    }

    gl_FragColor = col;
}