class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]
  before_action :authenticate_admin, only: %i[index update]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    begin
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    rescue
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def user_params
    params.require(:user).permit(:id, :full_name, :email, :role, :uid, :avatar_url)
  end

  def authenticate_admin
    unless current_user && current_user.role == "administrator"
      render json: { error: 'User does not have permission to access this endpoint.' }, status: :forbidden
    end
  end  
end
