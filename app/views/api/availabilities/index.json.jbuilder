@availabilities.each do |availability|
  json.set! availability.id do
    json.extract! availability, :pro_id, :day, :start_time, :end_time, :club_id, :id
  end
end
