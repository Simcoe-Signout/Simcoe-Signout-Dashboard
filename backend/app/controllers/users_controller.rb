class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

    def index
      @users = User.all
  
      render json: @users
    end
  
  def show
    render json: @user
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
end
