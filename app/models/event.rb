class Event < ApplicationRecord

validates :title, :event_type, :registerable, :start_time, :end_time, :date, :club_id, presence:true

belongs_to :club

def self.club_events(id)
  self.where(club_id: id)
end

end
