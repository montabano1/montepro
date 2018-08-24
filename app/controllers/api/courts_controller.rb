class Api::CourtsController < ApplicationController

  def create
    @court = Court.new(court_params)
    if @court.save
      render :show
    else
      render json: ['Something went wrong with creating your court']
    end
  end

  def index
    @courts = Court.club_courts(id)
  end

  private

  def court_params
    params.require(:court).permit(:club_id, :name, :court_type)
  end

  def id
    params[:id]
  end
end
