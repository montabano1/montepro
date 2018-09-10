@bookings.each do |booking|
  json.set! booking.id do
    json.extract! booking, :color, :pro_id, :event_id, :event_type, :date, :time, :club_id, :court_num, :title, :booked_by_id, :id
  end
end
