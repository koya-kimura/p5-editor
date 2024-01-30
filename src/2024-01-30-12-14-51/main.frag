precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;

uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

void main(void){
    vec2 uv=vTexCoord;

    vec4 col=texture2D(u_tex,uv);

    float gray=(col.r+col.g+col.b)/3.;

    if(gray<.2){
        col.rgb=u_color0;
    }else if(gray<.4){
        col.rgb=u_color1;
    }else if(gray<.6){
        col.rgb=u_color2;
    }else if(gray<.8){
        col.rgb=u_color3;
    }else{
        col.rgb=u_color4;
    }

    gl_FragColor=col;
}