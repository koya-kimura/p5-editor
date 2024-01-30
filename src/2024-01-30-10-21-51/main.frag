precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
// uniform vec3 u_colors[5];

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

vec3 colors[5]=vec3[](
    vec3(1.,0.,0.),// 赤
    vec3(0.,1.,0.),// 緑
    vec3(0.,0.,1.),// 青
    vec3(1.,1.,0.),// 黄色
    vec3(1.,0.,1.)// マゼンタ
);

void main(void) {
    vec2 uv = vTexCoord;

    vec4 col = texture2D(u_tex, uv);

    float gray = (col.r+col.g+col.b)/3.;
    int ch = int(floor(gray*5.));

    col.rgb = colors[ch];

    gl_FragColor = col;
}