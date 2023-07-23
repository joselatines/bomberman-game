const metal = {
  render: {
    fillStyle: 'gray',
    strokeStyle: 'black',
    lineWidth: 0,
  }
}

const block_solid = {
  render: {
    sprite: {
      texture: '../../../assets/block_solid.png',
      xScale: 1.55,
      yScale: 1.55
    }
  }
}

const block_destroy = {
  render: {
    sprite: {
      texture: '../../../assets/block_destroy.png',
      xScale: 1.55,
      yScale: 1.55
    }
  }
}

export {metal, block_solid, block_destroy};