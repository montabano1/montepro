class Api::BookingsController < ApplicationController

  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      render :show
    else
      render json: ['Something went wrong with creating your booking']
    end
  end

  def index
    @bookings = Booking.booked_courts(clubId, date)
    # @bookings = Booking.all
  end

  def show
    @booking = Booking.find(params[:id])
    if @booking
      render :show
    else
      render json: ['something went wrong'], status: 422
    end
  end

  def destroy
    @booking = Booking.find(params[:id])
    if @booking.destroy
      render :index
    else
      render json: ['something went wrong'], status: 422
    end
  end


  private

  def booking_params
    params.require(:booking).permit(:color, :date, :start_time, :end_time, :club_id, :court_num, :booked_by_id, :title)
  end

  def date
    params[:date]
  end
  def clubId
    params[:club_id]
  end
end
