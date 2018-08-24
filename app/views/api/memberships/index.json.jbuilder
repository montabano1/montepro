@memberships.each do |membership|
  json.set! membership.id do
    json.extract! membership, :member_id, :club_id, :id
  end
end
