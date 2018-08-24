@bookings.each do |booking|
  json.set! booking.id do
    json.extract! booking, :date, :start_time, :end_time, :club_id, :court_num, :title, :booked_by_id, :id
  end
end
