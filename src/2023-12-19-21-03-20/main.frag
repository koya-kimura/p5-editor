precision mediump float;

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform vec2 u_mousePosition;
uniform float u_time;

float sphereSize=.6;

float sphereDistanceFunction(vec3 position,float size){
    return length(position)-size;
}

vec3 normal(vec3 pos,float size){
    float v=.001;
    return normalize(vec3(sphereDistanceFunction(pos,size)-sphereDistanceFunction(vec3(pos.x-v,pos.y,pos.z),size),sphereDistanceFunction(pos,size)-sphereDistanceFunction(vec3(pos.x,pos.y-v,pos.z),size),sphereDistanceFunction(pos,size)-sphereDistanceFunction(vec3(pos.x,pos.y,pos.z-v),size)));
}

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(void){
    // どうしてもわからない
    // 座標変換が謎い
    vec2 fragCoord = (gl_FragCoord.xy+u_resolution)/2.;
    vec2 position=(fragCoord.xy-u_resolution.xy)/min(u_resolution.x,u_resolution.y);

    // vec2 position = (fract(fragCoord.xy/min(u_resolution.x,u_resolution.y)*5.)-0.5)*2.;

    vec3 cameraPosition=vec3(0.,0.,10.);
    float screenZ=4.;

    vec3 lightDirection=normalize(vec3(sin(u_time), cos(u_time), cos(u_time)));
    vec3 rayDirection=normalize(vec3(position,screenZ)-cameraPosition);
    vec3 color=vec3(0.);
    float depth=0.;

    for(int i=0;i<99;i++){
        vec3 rayPosition=cameraPosition+rayDirection*depth;
        float dist=sphereDistanceFunction(rayPosition,sphereSize);

        if(dist<.0001){
            vec3 normal=normal(cameraPosition,sphereSize);
            float differ= dot(normal,lightDirection);
            color=vec3(differ);
            break;
        }

        cameraPosition+=rayDirection*dist;
    }

    color.rgb+=random(position)*.45;

    gl_FragColor=vec4(color.rg, 1.0,1.);
}

