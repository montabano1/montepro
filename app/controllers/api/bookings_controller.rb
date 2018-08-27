class Api::BookingsController < ApplicationController

  def create
    @errors = []
    @bookings = []
    unless booking_params[:maxppl]
      i = 0
      time = booking_params[:time].to_i
      while i < booking_params[:end_time].to_i
        temp = Booking.new(
          date: booking_params[:date],
          time: time + i,
          club_id: booking_params[:club_id],
          title: booking_params[:title],
          court_num: booking_params[:court_num],
          booked_by_id: booking_params[:booked_by_id]
        )
        if temp.save
          @bookings << temp
        else
          @errors << [`There is already a court booked on #{temp[date]} at #{temp[time]}`]
        end
        i += 1
      end
    else
      start = Time.parse(booking_params[:date])
      final = Time.parse(booking_params[:recd])
      @bookings = []
      @errors = []
      while start <= final
        if start.strftime("%A") == booking_params[:day]
          i = 0
          time = booking_params[:start_time].to_i
          while i < booking_params[:end_time].to_i - booking_params[:start_time].to_i
            temp = Booking.new(
              date: start.to_s[0..9],
              time: time + i,
              club_id: booking_params[:club_id],
              title: booking_params[:title],
              court_num: booking_params[:court_num],
              booked_by_id: booking_params[:booked_by_id]
            )
            if temp.save
              @bookings << temp
            else
              debugger
              @errors << [`There is already a court booked on #{temp[date]} at #{temp[time]}`]
            end
            i += 1
          end
        end
        start += 24*60*60
      end
    end
    render :created
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
    params.require(:booking).permit(:color, :date, :time, :club_id, :court_num,
      :booked_by_id, :title, :bookings, :registerable, :day, :start_time, :end_time,
    :maxppl, :event_type, :recd)
  end

  def date
    params[:date]
  end
  def clubId
    params[:club_id]
  end
end
