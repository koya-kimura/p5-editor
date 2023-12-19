// ☆: 加筆箇所
attribute vec3 aPosition;// 頂点の位置ベクトル
attribute vec3 aNormal;// 頂点の法線ベクトル
attribute vec2 aTexCoord;// 頂点のUV座標（テクスチャーを貼る座標）

uniform mat4 uModelViewMatrix;// 位置ベクトルを座標変換する行列その1
uniform mat4 uProjectionMatrix;// 位置ベクトルを座標変換する行列その2
uniform mat3 uNormalMatrix;// 法線ベクトルを座標変換する行列

uniform vec3 uLightingDirection[5];// ☆平行光源の方向ベクトル

varying vec3 vVertexNormal;// 座標変換後の法線ベクトル
varying highp vec2 vVertTexCoord;// UV座標（テクスチャーを貼る座標）
varying vec3 vLightDirection;// ☆平行光源の方向ベクトルの逆

void main(void){
    vec4 positionVec4=vec4(aPosition,1.);
    gl_Position=uProjectionMatrix*uModelViewMatrix*positionVec4;
    vVertexNormal=normalize(vec3(uNormalMatrix*aNormal));
    vVertTexCoord=aTexCoord;
    vLightDirection=-uLightingDirection[0];// ☆平行光源の方向ベクトルをフラグメントシェーダーに渡す
}
