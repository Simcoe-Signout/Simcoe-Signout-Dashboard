class UsersController < ApplicationController
    before_action :set_user, only: [:show]
  
    def show
      render json: @user
    end
  
    private
  
    def set_user
      begin
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound # Just checking if the record isn't found, this is a janky method to do this but it works for now.
        render json: { error: 'User not found' }, status: :not_found
        return
      end
    
      unless authorized_user?
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
    
    private
    
    def headers
      request.headers
    end
    
    def authorized_user?
      decoded_user_id = decoded_auth_token[:user_id]
      params[:id].to_i == decoded_user_id
    end
    
    # Just manually adding this method and http_auth_header method from AuthorizeApiRequest for testing prurposes
    def decoded_auth_token
      @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
    end
    
    def http_auth_header
      if headers['Authorization'].present?
        return headers['Authorization'].split(' ').last
      else
        render json: { error: 'Missing Token' }, status: 400
      end
      nil
    end    
  end  