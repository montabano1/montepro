class Api::EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    if @event.save
      render :show
    else
      render json: ['Something went wrong with creating your event']
    end
  end

  def index
    @events = Event.club_events(clubId)
  end

  def show
    @event = Event.find(params[:id])
    if @event
      render :show
    else
      render json: ['something went wrong'], status: 422
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render :show
    else
      render json: ['something went wrong'], status: 422
    end

  def destroy
    @event = Event.find(params[:id])
    if @event.destroy
      render :index
    else
      render json: ['something went wrong'], status: 422
    end
  end


  private

  def event_params
    params.require(:event).permit(:date, :start_time, :end_time, :club_id, :registerable, :event_type, :maxppl, :title)
  end

  def date
    params[:date]
  end
  def clubId
    params[:club_id]
  end
end
