export const fetchEvent = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/events/${id}`
  })
}

export const fetchEvents = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/events`,
    data: { club_id: id}
  })
}

export const createEvent = (event) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/events`,
    data: { event }
  })
}
