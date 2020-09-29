import getUser from 'utils/getUser'

describe('getUser', () => {
  const users = [
    { id: 1, login: 'john' },
    { id: 2, login: 'anna' }
  ]

  it('Returns user data when found', () => {
    expect(getUser('john', users)).toEqual({ id: 1, login: 'john' })
  })

  it('Returns nothing when nothing found', () => {
    expect(getUser('suzy', users)).toBeUndefined()
  })

  it('Returns nothing when no users available', () => {
    expect(getUser('john')).toBeUndefined()
  })
})
