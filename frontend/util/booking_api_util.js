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
export const deleteBooking = (id, rec) => {
  return $.ajax ({
    method: 'DELETE',
    url: `/api/bookings/${id}`,
    data: {booking: {recurring: rec}}
  })
}

export const createBooking = (booking) => {
  return $.ajax ({
    method: 'POST',
    url: `/api/bookings`,
    data: { booking }
  })
}
export const createBookings = (bookings) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/booking/mult`,
    data: { bookings }
  })
}
