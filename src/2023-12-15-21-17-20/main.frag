precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;
uniform sampler2D u_tex3d;
uniform float u_blend0;
uniform float u_blend1;
uniform float u_vol;
uniform float u_noise;

float pi=3.14159265358979;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(void){
    vec2 uv=vTexCoord;

    // ------------------------------

    vec2 uv0=mod(uv*floor(20.*pow(u_vol,3.) + 1.0),1.);
    // if(u_vol>.5&&sin(u_time+1.0)>0.){
    //     uv0.y+=cos(uv0.x*10.0+u_time*20.0)*0.2;
    // }
    vec4 smpColor0=texture2D(u_tex,uv0);

    // ------------------------------

    vec2 uv1=uv;
    if(u_vol>.4){
        uv1=floor(uv1*100.)/100.;
    }
    if(u_vol>.5 && sin(u_time) > 0.0){
        uv1.y=.5;
    }
    if(u_noise>.7){
        uv1=mod(uv*floor(min(20.*pow(u_vol,3.), 1.0)),1.);
    }
    vec4 smpColor1=texture2D(u_tex3d,uv1);

    // ------------------------------

    vec4 col=smpColor0*u_blend0+smpColor1*u_blend1;

    // ------------------------------

    vec4 smpColor0R=texture2D(u_tex,uv0+u_vol*.01);
    vec4 smpColor1R=texture2D(u_tex3d,uv1+u_vol*.01);

    col.r=(smpColor0R*u_blend0+smpColor1R*u_blend1).r;

    vec4 smpColor0G=texture2D(u_tex,uv0-u_vol*.01);
    vec4 smpColor1G=texture2D(u_tex3d,uv1-u_vol*.01);

    col.g=(smpColor0G*u_blend0+smpColor1G*u_blend1).g;  

    // ------------------------------

    col.rgb+=random(uv)*.15;

    if(u_vol>.75){
        vec2 uvN =floor(uv*500.)/500.;
        col.r+=random(vec2(uvN.x,uvN.y+u_time*1.4))*.5;
        col.g+=random(vec2(uvN.x,uvN.y+u_time*1.5))*.5;
        col.b+=random(vec2(uvN.x,uvN.y+u_time*1.6))*.5;
    }

    gl_FragColor=col;
}