export const getUser = (login, users) => users[users.findIndex(user => user.login === login)]

export const getFields = fieldnames => item =>
  fieldnames.reduce(
    (previous, current) =>
      typeof item[current] === 'undefined' ? previous : { ...previous, [current]: item[current] },
    {}
  )
