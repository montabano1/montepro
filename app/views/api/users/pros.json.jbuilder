@pros.each do |pro|
  json.set! pro.id do
    json.extract! pro, :id, :username, :authorized, :club_id, :pro_member
  end
end
