const expect = require('chai').expect
const { getMaxIsolationLevel } = require('./isolation-service')

describe('getMaxIsolationLevel', () => {
  it('for 1 country should get itown isolation level', () => {
    expect(getMaxIsolationLevel([{ isolationLevel: 1 }]))
      .to.deep.equal({ isolationLevel: 1 })
  })
  it('for 2 country should get maxlevel', () => {
    expect(getMaxIsolationLevel([{ isolationLevel: 1 }, { isolationLevel: 2 }]))
      .to.deep.equal({ isolationLevel: 2 })
  })
  it('for 2 country should get maxlevel', () => {
    expect(getMaxIsolationLevel([{ isolationLevel: 56 }, { isolationLevel: 2 }, { isolationLevel: 86 }]))
      .to.deep.equal({ isolationLevel: 86 })
  })
})
