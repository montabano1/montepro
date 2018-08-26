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

export const createCourt = (court) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/courts`,
    data: { court }
  })
}
