class Club < ApplicationRecord

  validates :name, presence:true

  has_many :memberships
  has_many :members, through: :memberships, source: :members
end
