export const fetchClub = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/clubs/${id}`
  })
}

export const fetchClubs = () => {
  return $.ajax ({
    method: 'GET',
    url: `/api/clubs`
  })
}

export const createClub = (club) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/clubs`,
    data: { club }
  })
}
