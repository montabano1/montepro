class Membership < ApplicationRecord

validates :member_id, :club_id, presence:true

belongs_to :member, class_name: :User
belongs_to :club


end
