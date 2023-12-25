precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform vec2 u_resolution;

float pi=3.14159265358979;

float sphereSize=.2;
vec3 boxSize = vec3(0.2);

float sphereDistanceFunction(vec3 position,float size){
    return length(position)-size;
}

float sdTorus(vec3 p,vec2 t)
{
    vec2 q=vec2(length(p.xz)-t.x,p.y);
    return length(q)-t.y;
}

float sdBox(vec3 p,vec3 b)
{
    vec3 q=abs(p)-b;
    return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);
}

vec3 normal(vec3 pos,float size){
    float v=.001;
    return normalize(vec3(sphereDistanceFunction(pos,size)-sphereDistanceFunction(vec3(pos.x-v,pos.y,pos.z),size),sphereDistanceFunction(pos,size)-sphereDistanceFunction(vec3(pos.x,pos.y-v,pos.z),size),sphereDistanceFunction(pos,size)-sphereDistanceFunction(vec3(pos.x,pos.y,pos.z-v),size)));
}

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec3 rotate(vec3 p,float angle,vec3 axis){
    vec3 a=normalize(axis);
    float s=sin(angle);
    float c=cos(angle);
    float r=1.-c;
    mat3 m=mat3(
        a.x*a.x*r+c,
        a.y*a.x*r+a.z*s,
        a.z*a.x*r-a.y*s,
        a.x*a.y*r-a.z*s,
        a.y*a.y*r+c,
        a.z*a.y*r+a.x*s,
        a.x*a.z*r+a.y*s,
        a.y*a.z*r-a.x*s,
        a.z*a.z*r+c
    );
    return m*p;
}

void main(void){
    float t=mod(u_time,30.);

    vec2 uv=vTexCoord;

    // uv = fract(uv*10.0);
    uv = uv*10.0

    uv-=.5;
    uv.y*=u_resolution.y/u_resolution.x;

    vec3 cameraPosition=vec3(0.,0.,10.);
    float screenZ=4.;

    vec3 lightDirection=normalize(vec3(sin(u_time),cos(u_time),cos(u_time)));
    vec3 rayDirection=normalize(vec3(uv,screenZ)-cameraPosition);
    vec3 col=vec3(0.2, 0.1, 0.05);
    float depth=0.;

    cameraPosition.x += clamp(pow(sin(t), 5.0)*5.0, -0.5, 0.5);

    for(int i=0;i<99;i++){
        vec3 rayPosition=cameraPosition+rayDirection*depth;
        rayPosition = rotate(rayPosition, u_time ,vec3(0.5, 0.5, 0.0));

        float dist=sdTorus(rayPosition, vec2(0.2, 0.1));

        if(dist<.0001){
            vec3 normal=normal(cameraPosition,sphereSize);
            float differ=dot(normal,lightDirection);
            col.g+=differ*0.4;
            break;
        }
        cameraPosition+=rayDirection*dist;
    }

    gl_FragColor=vec4(col, 1.0);
}