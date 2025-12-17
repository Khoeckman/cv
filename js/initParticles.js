import CanvasParticles from 'https://cdn.jsdelivr.net/npm/canvasparticles-js@4.1/dist/index.min.mjs'

// Init particles
const selector = '#canvas-particles'
const options = {
  background: 'linear-gradient(115deg, #354089, var(--black))',

  mouse: {
    interactionType: 2,
    connectDistMult: 1.25,
    distRatio: 1,
  },

  particles: {
    color: '#88c8ff',
    ppm: 140,
    connectDistance: 110,
    relSpeed: 0.8,
    rotationSpeed: 1,
  },
  gravity: {
    repulsive: 2,
    pulling: 0.0,
    friction: 0.8,
  },
}

export const canvas = new CanvasParticles(selector, options)
