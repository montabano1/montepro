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
          booked_by_id: booking_params[:booked_by_id],
          event_type: booking_params[:event_type],
          event_id: booking_params[:event_id],
          pro_id: booking_params[:pro_id]
        )
        begin
          if temp.save
            @bookings << temp
          end
        rescue Exception => e
          @errors << [`there is already a court booked on #{temp[date]} at #{temp[time]}`]
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
              booked_by_id: booking_params[:booked_by_id],
              event_type: booking_params[:event_type],
              event_id: booking_params[:event_id],
              pro_id: booking_params[:pro_id]

            )
            begin
              temp.save
              @bookings << temp
            rescue Exception => e
              @errors << e.cause.to_s.split('=')[-1]
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
    if (booking_params[:recurring] == 'No')
      @bookings = Booking.where(date: @booking.date).where(court_num: @booking.court_num)
      .where(title: @booking.title).where(booked_by_id: @booking.booked_by_id)
    else
      @bookings = Booking.where(court_num: @booking.court_num)
      .where(title: @booking.title).where(booked_by_id: @booking.booked_by_id)
    end
    @bookings.each do |book|
      if Date.parse(book.date) >= Date.parse(@booking.date)
        book.destroy
      end
    end
    render :index
  end


  private

  def booking_params
    params.require(:booking).permit(:color, :date, :time, :club_id, :court_num,
      :booked_by_id, :title, :bookings, :registerable, :day, :start_time, :end_time,
    :maxppl, :event_type, :recd, :pro_id, :recurring, :event_id)
  end

  def date
    params[:date]
  end
  def clubId
    params[:club_id]
  end
end
