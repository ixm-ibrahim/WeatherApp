//https://stackoverflow.com/questions/24820004/how-to-implement-a-shadertoy-shader-in-three-js?noredirect=1&lq=1
/*
1. Add uniforms to the top of the shader
2. Replace "gl_FragCoord.xy / iResolution.xy" with "varyingUV" or "iResolution.xy,uv=(fragCoord-0.5*R)/R.x" with "-1.0 + 2.0 *varyingUV" (make sure to multiply/divide by aspect ratio)
3. Replace any iChannels with textures?
4. Make the function main() and returns "gl_FragColor" (make sure w is set to 1 if there is no transparency)

*/


/*
const fragmentShader = `
varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
  // "Normalizing" with an arbitrary value
  // We'll see a cleaner technique later :)   
  vec2 normalizedPixel = gl_FragCoord.xy/600.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,1.0);
}

`
*/

//https://www.shadertoy.com/view/tltSWs
const fragmentShader = `
uniform float iTime;
uniform float u_aspectRatio;

varying vec2 varyingUV;

//Basic Fractal Zero by @paulofalcao

const int maxIterations=6;

//generic rotation formula
mat2 rot(float a){
    float c=cos(a);float s=sin(a);
    return mat2(c,-s,s,c);
}

//void mainImage( out vec4 fragColor, in vec2 fragCoord ){
void main() {
	//normalize stuff
    //vec2 R=iResolution.xy,uv=(fragCoord-0.5*R)/R.x;
    vec2 uv = (-1.0 + 2.0 *varyingUV) / vec2(u_aspectRatio, 1.);
    //vec2 uv = (-1.0 + 2.0 *varyingUV) * vec2(1., u_aspectRatio); // not contained within container

	//global zoom
	uv*=sin(iTime)*0.25+1.0;
    
	//shift, mirror, rotate and scale 6 times...
	for(int i=0;i<maxIterations;i++){
        uv*=2.1;          //<-Scale
        uv*=rot(iTime);   //<-Rotate
		uv=abs(uv);       //<-Mirror
        uv-=0.5;          //<-Shift
	}

	//draw a circle
	//fragColor=vec4(length(uv)<0.4);
	gl_FragColor=vec4(vec3(length(uv)<0.4), 1.);
}
`;


export default fragmentShader;