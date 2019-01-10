import randomBetween from './randomBetween'

const DEGREES_IN_CIRCLE = 360;
const RADIANS_360_DEGREES = DEGREES_IN_CIRCLE * (Math.PI/180);

const constantine = 500;

export default class Particle {

  constructor(mesh){
    this.mesh = mesh;

    const initialVelocity = 150 //randomBetween(100, 200);

    const initialAngleYZ = randomBetween(0, RADIANS_360_DEGREES);
    const initialAngleXY = randomBetween(0, RADIANS_360_DEGREES);

    this.initialVelocityX = initialVelocity * Math.cos(initialAngleYZ) * Math.sin(initialAngleXY);
    this.initialVelocityY = initialVelocity * Math.cos(initialAngleYZ) * Math.cos(initialAngleXY) + (constantine / 2);
    this.initialVelocityZ = initialVelocity * Math.sin(initialAngleYZ);

    this.rotationalVelocity = randomBetween(0, 1.5)
    // console.log(this.initialVelocityZ)
  }

  update(t, o) {
    this.mesh.position.x = this.initialVelocityX * (t / constantine);
    this.mesh.position.y = this.initialVelocityY * (t / constantine) - Math.pow(t, 2) * ( 3.6 * ( 36 / ( constantine * 1000 ) ) ) - 100;
    this.mesh.position.z = this.initialVelocityZ * (t / constantine);

    this.mesh.rotation.z = this.rotationalVelocity * (t / constantine);

    this.mesh.material.opacity = o
  }

  




}