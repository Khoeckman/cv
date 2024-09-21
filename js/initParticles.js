import canvasParticles from './canvasParticles.js'

// Init particles
const selector = '#canvas-particles'
const options = {
  background: 'linear-gradient(115deg, #354089, var(--black))',
  framesPerUpdate: 1,
  resetOnResize: false,

  mouse: {
    interactionType: 2,
    connectDistMult: 0.8,
    distRatio: 1,
  },

  particles: {
    color: '#88c8ffa0',
    ppm: 70,
    relSpeed: 0.8,
    rotationSpeed: 1,
  },
  gravity: {
    repulsive: 2,
    pulling: 0.0,
    friction: 0.8,
  },
}

export const canvas = new canvasParticles(selector, options)
