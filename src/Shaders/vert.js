/*#version 330

const vec2 quadVertices[4] = { vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0), vec2(1.0, 1.0) };

void main()
{
    gl_Position = vec4(quadVertices[gl_VertexID], 0.0, 1.0);
}
*/

/*
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  //gl_Position = projectedPosition;
  gl_Position = modelPosition;
}

`;
*/

const vertexShader = `
varying vec2 varyingUV;

void main(){
  varyingUV = uv;
  gl_Position = vec4( position.xy , 0. , 1.);
}
`;

export default vertexShader;