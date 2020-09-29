import getFields from 'utils/getFields'

describe('getFields', () => {
  const users = [
    { id: 1, login: 'john' },
    { id: 2, login: 'anna' }
  ]

  it('Returns an array of objects with selected keys only', () => {
    const input = users.map(getFields(['login']))
    const output = [{ login: 'john' }, { login: 'anna' }]
    expect(input).toEqual(output)
  })

  it('Returns empty objects when no keys found', () => {
    const input = users.map(getFields(['url']))
    const output = [{}, {}]
    expect(input).toEqual(output)
  })

  it('Returns empty objects when no keys selected', () => {
    const input = users.map(getFields())
    const output = [{}, {}]
    expect(input).toEqual(output)
  })

  it('Returns an empty array if no users available', () => {
    const input = [].map(getFields())
    const output = []
    expect(input).toEqual(output)
  })
})
