precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;

float pi = 3.14159265358979;

void main(void) {
    vec2 uv = vTexCoord;

    vec4 col=texture2D(u_tex,uv);

    gl_FragColor = col;
}