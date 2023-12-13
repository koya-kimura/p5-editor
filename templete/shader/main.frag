precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;

float pi = 3.14159265358979;

void main(void) {
    vec2 uv = vTexCoord;

    vec4 col = vec4(1., 1., 0, 1.);

    gl_FragColor = col;
}