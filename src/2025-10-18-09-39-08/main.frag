precision mediump float;

varying vec2 vTexCoord;

uniform float u_time;
uniform sampler2D u_tex;

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

float map(float value, float min1, float max1, float min2, float max2){
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main(void) {
    vec2 uv = vTexCoord;
    vec4 color = texture2D(u_tex, uv);
    float g = (color.r + color.g + color.b) / 3.0;

    float gridNum = 40.0;

    float gridIndex = floor(uv.x * gridNum);
    float gridFract = fract(uv.x * gridNum);

    float a = fract(uv.x * gridNum);
    float b = a - 0.5;
    float c = b * 1.5;

    float d = c  / gridNum;
    float e = floor(uv.x*gridNum) / gridNum + 0.5 / gridNum + d;
    uv.x = e;

    if(vTexCoord.y<.4||vTexCoord.y>.6){
        uv += random(uv) * 0.003 - 0.0015;
    } else {
        uv += random(uv) * 0.014 - 0.007;
    }

    if((vTexCoord.y < 0.4 || vTexCoord.y > 0.6) && g < 0.05){
        uv.y = 0.5;
    }

    vec4 outcol = texture2D(u_tex, uv);

    if(vTexCoord.y<.4||vTexCoord.y>.6){
        outcol = vec4(texture2D(u_tex,uv + random(uv) * 0.01 - 0.005).r, texture2D(u_tex, uv).gba);
    }

    gl_FragColor = outcol;
}