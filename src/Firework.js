import Particle from './Particle'
import penner from 'penner'

export default class Firework {

  constructor({ createMesh, render }){
    this.particles = this.constructor.makeParticles(100, createMesh);
    this.render = render;
    this.go = this.go.bind(this)
  }


  go() {
    const now = performance.now();
    this.startTime = this.startTime || now;
    const elapsed = now - this.startTime;
    const o = this.constructor.opacity(elapsed)
    this.particles.forEach(particle => {
      particle.update(elapsed, o)
    })
    // console.log(elapsed)
    this.render()
    if (elapsed < 3000) requestAnimationFrame(this.go)
  }

  static makeParticles(howMany, createMesh) {
    const particles = []
    for (let i = 0; i < howMany; i++) {
      particles.push(new Particle(createMesh()))
    }
    return particles
  }

  static opacity(t) {
    const endFadeIn = 1000;
    const startFadeOut = 1500;
    const fadeOutDuration = 1500;

    if (t < endFadeIn) {
      // console.log(penner.easeOutQuad(t, 0, 1, 1000))
      return penner.easeOutQuad(t, 0, 1, endFadeIn)
    } else if (t > startFadeOut + fadeOutDuration) {
      return 0
    } else if ( t > startFadeOut) {
      return penner.easeInOutQuad(t - startFadeOut, 1, -1, fadeOutDuration)
    }
    return 1
  }

}