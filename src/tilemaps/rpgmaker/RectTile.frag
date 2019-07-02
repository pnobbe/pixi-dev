varying vec2 vTextureCoord;
varying vec4 vFrame;
varying float vTextureId;

uniform vec4 shadowColor;
uniform sampler2D uSamplers[4];
uniform vec2 uSamplerSize[4];

void main(void){
    vec2 textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);
    int textureId = floor(vTextureId + 0.5);
    vec4 color;

    if (vTextureId <= -1.0) {
        color = shadowColor;
    } else {
        color = texture2D(uSamplers[textureId], textureCoord * uSamplerSize[textureId]);
    }

    gl_FragColor = color;
}
