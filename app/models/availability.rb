class Availability < ApplicationRecord

  validates :pro_id, :day, :start_time, :end_time, presence: true

  belongs_to :pro, class_name: :User

end
