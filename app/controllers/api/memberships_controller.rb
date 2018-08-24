class Api::MembershipsController < ApplicationController

  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render :show
    else
      render json: ['Something went wrong with creating your membership']
    end
  end

  def index
    @memberships = Membership.all
  end

  # def check
  #   @memberships = Membership.where(:member_id == id)
  #   render :check
  # end

  private

  def membership_params
    params.require(:membership).permit(:member_id, :club_id)
  end

  def id
    params[:member_id]
  end
end
