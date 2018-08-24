@courts.each do |court|
  json.set! court.id do
    json.extract! court, :club_id, :name, :court_type, :id
  end
end
