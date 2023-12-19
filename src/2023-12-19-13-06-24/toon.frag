precision highp float;

uniform vec4 uMaterialColor;// fill()で指定された色（RGBA）
uniform sampler2D uSampler;// texture()で指定された画像
uniform bool isTexture;// textureを使うか否か

varying vec3 vVertexNormal;// 座標変換後の法線ベクトル
varying highp vec2 vVertTexCoord;// UV座標（テクスチャーを貼る座標）
varying vec3 vLightDirection;// ☆平行光源の方向ベクトルの逆

void main(){
    vec3 direction=normalize(vLightDirection);
    vec3 normal=normalize(vVertexNormal);
    float intensity=max(0.,dot(direction,normal));// 平行光源と法線が成す角をθとしたときのcosθ

    vec4 tintColor;// 影の色
    if(intensity>.95){
        tintColor=vec4(1.,1.,1.,1.);
    }else if(intensity>.5){
        tintColor=vec4(.9,.8,.8,1.);
    }else if(intensity>.25){
        tintColor=vec4(.7,.5,.5,1.);
    }else{
        tintColor=vec4(.5,.2,.2,1.);
    }

    if(!isTexture){// テクスチャーを使わないとき
        gl_FragColor=uMaterialColor*tintColor;
    }
    else{// テクスチャーを使うとき
        gl_FragColor=texture2D(uSampler,vVertTexCoord)*tintColor;
    }
}
