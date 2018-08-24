export const fetchMembership = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/memberships/${id}`
  })
}

export const fetchMemberships = () => {
  return $.ajax ({
    method: 'GET',
    url: `/api/memberships`
  })
}

export const createMembership = (membership) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/memberships`,
    data: { membership }
  })
}
