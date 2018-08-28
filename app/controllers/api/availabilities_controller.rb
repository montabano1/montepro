class Api::AvailabilitiesController < ApplicationController

  def show
    @availability = Availability.find(params[:id])
  end

  def create
    @availability = Availability.new(availability_params)
    if @availability.save
      render :show
    else
      render json: ['Something went wrong with creating your availability']
    end
  end

  def index
    @availability = Availability.all
  end

  private

  def availability_params
    params.require(:availability).permit(:day, :pro_id, :start_time, :end_time)
  end



end
