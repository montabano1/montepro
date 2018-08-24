@clubs.each do |club|
  json.set! club.id do
    json.extract! club, :name, :address, :secret, :id
  end
end
