precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_tex3d;
uniform float u_blend0;
uniform float u_blend1;

float pi = 3.14159265358979;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(void) {
    vec2 uv = vTexCoord;

    vec2 uv0 = mod(uv*10.0, 1.0);
    vec4 smpColor0 = texture2D(u_tex, uv0);

    vec2 uv1 = uv;
    vec4 smpColor1 = texture2D(u_tex3d,uv1);

    vec4 col = smpColor0*u_blend0+smpColor1*u_blend1;

    col.rgb += random(uv) * 0.2;

    gl_FragColor = col;
}