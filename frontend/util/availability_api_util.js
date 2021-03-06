export const fetchAvailability = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/availabilities/${id}`
  })
}
export const editAvailability = (id) => {
  return $.ajax ({
    method: 'PATCH',
    url: `/api/availabilities/${id}`
  })
}
export const deleteAvailability = (id) => {
  return $.ajax ({
    method: 'DELETE',
    url: `/api/availabilities/${id}`
  })
}

export const fetchAvailabilities = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/availabilities`,
    data: {club_id: id}
  })
}

export const createAvailability = (availability) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/availabilities`,
    data: { availability }
  })
}
