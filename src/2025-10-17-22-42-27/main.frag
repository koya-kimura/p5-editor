precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;

float PI=3.14159265358979;

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

void main(void){
    vec2 uv=vTexCoord;
    
    if(uv.y<.2){
        uv.x+=random(uv)*.002-.001;
        uv.x=floor(uv.x*200.)/200.;
        uv.y=floor(uv.y*(200.*9./16.))/(200.*9./16.);
    }
    else if(uv.y<.4){
        uv.x+=random(uv)*.01-.005;
        uv.x=floor(uv.x*50.)/50.;
        uv.y=floor(uv.y*(50.*9./16.))/(50.*9./16.);
    }
    else if(uv.y<.6){
        uv.x+=random(uv)*.02-.01;
        uv.x=floor(uv.x*20.)/20.;
        uv.y=floor(uv.y*(20.*9./16.))/(20.*9./16.);
    }
    else if(uv.y<.8){
        uv.x+=random(uv)*.004-.002;
        uv.x=floor(uv.x*100.)/100.;
        uv.y=floor(uv.y*(100.*9./16.))/(100.*9./16.);
    }
    else{
        uv.x+=random(uv)*.001-.0005;
        uv.x=floor(uv.x*500.)/500.;
        uv.y=floor(uv.y*(500.*9./16.))/(500.*9./16.);
    }
    
    vec4 col=vec4(texture2D(u_tex,uv+vec2(.002)).r,texture2D(u_tex,uv).gba);
    
    gl_FragColor=col;
}