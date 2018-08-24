class Api::SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      log_in!(@user)
      render :template => '/api/users/show'
    else
      render json: ["INVALID USERNAME/PASSWORD COMBINATION"], status: 401
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
