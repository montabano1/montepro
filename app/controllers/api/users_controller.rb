class Api::UsersController < ApplicationController

  def create

    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render :show
    else
      render json: ["That Email already exists"], status: 401
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: ['something went wrong'], status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: ['something went wrong'], status: 422
    end
  end

  def pros
    @pros = User.where(club_id: id).where(pro_member: 'pro')
    render :pros
  end 

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :pro_member, :authorized, :club_id)
  end

  def id
    params[:club_id]
  end

end
