class Api::ClubsController < ApplicationController

  def show
    @club = Club.find(params[:id])
  end

  def create
    @club = Club.new(club_params)
    if @club.save
      render :show
    else
      render json: ['Something went wrong with creating your club']
    end
  end

  def index
    @clubs = Club.all 
  end

  private

  def club_params
    params.require(:club).permit(:name, :director_id, :court_amt, :lng, :lat, :secret, :phone_number, :email, :address)
  end
end
