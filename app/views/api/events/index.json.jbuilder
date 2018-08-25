:date, :start_time, :end_time, :club_id, :registerable, :event_type, :maxppl, :title
@events.each do |event|
  json.set! event.id do
    json.extract! event, :date, :start_time, :end_time, :club_id, :registerable, :event_type, :maxppl, :title, :id
  end
end
