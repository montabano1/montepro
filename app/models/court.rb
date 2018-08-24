class Court < ApplicationRecord

  validates :club_id, presence:true

  belongs_to :club

  def self.club_courts(id)
    self.where(club_id: id)
  end

end
