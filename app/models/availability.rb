require 'user'

class Availability < ApplicationRecord

  validates :pro_id, :day, :start_time, :end_time, :club_id, presence: true

  belongs_to :pro, class_name: :User

  def self.club_pro_avails(id)
    pros = User.where(club_id: id).where(pro_member: 'pro').pluck(:id)
    avails = []
    pros.each do |id|
      avails << Availability.where(pro_id: id)
    end
    avails
  end
end
