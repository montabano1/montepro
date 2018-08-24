export const fetchBooking = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/bookings/${id}`
  })
}

export const fetchBookings = (id, date) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/bookings`,
    data: { club_id: id, date: date}
  })
}

export const createBooking = (booking) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/bookings`,
    data: { booking }
  })
}
