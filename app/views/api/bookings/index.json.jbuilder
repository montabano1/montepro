@bookings.each do |booking|
  json.set! booking.id do
    json.extract! booking, :color, :date, :time, :club_id, :court_num, :title, :booked_by_id, :id
  end
end
