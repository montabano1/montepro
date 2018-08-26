export const fetchCourt = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/courts/${id}`
  })
}
export const fetchCourts = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/courts/`,
    data: {id}
  })
}

export const createCourt = (courts) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/courts`,
    data: { courts }
  })
}
