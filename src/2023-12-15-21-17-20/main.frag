precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_tex3d;
uniform float u_blend0;
uniform float u_blend1;
uniform float u_vol;

float pi = 3.14159265358979;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(void) {
    vec2 uv = vTexCoord;

    vec2 uv0 = mod(uv*floor(10.0*u_vol), 1.0);
    vec4 smpColor0 = texture2D(u_tex, uv0);

    vec2 uv1 = uv;
    if(u_vol > 0.4){
        uv1 = floor(uv1*100.0)/100.0;
    }
    vec4 smpColor1 = texture2D(u_tex3d,uv1);

    vec4 col = smpColor0*u_blend0+smpColor1*u_blend1;

    vec4 smpColor0R = texture2D(u_tex, uv0 + u_vol * 0.1);
    vec4 smpColor1R = texture2D(u_tex3d, uv1 + u_vol*.1);

    col.r = (smpColor0R*u_blend0+smpColor1R*u_blend1).r;

    col.rgb += random(uv) * 0.2;

    gl_FragColor = col;
}