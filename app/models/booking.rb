class Booking < ApplicationRecord

validates :date, :start_time, :end_time, :club_id, :court_num, :booked_by_id, presence:true

belongs_to :court, foreign_key: :court_num, class_name: :Court
belongs_to :club

def self.booked_courts(clubId, date)
  self.where(club_id: clubId).where(date: date)
end


end
