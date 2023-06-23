class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :authenticate_request

  def google_oauth2
    user = User.from_omniauth(auth)

    if user.present?
      #sign_out_all_scopes
      puts "user: #{user}. Success! Signed in: #{user.email}"
      #flash[:success] = t 'devise.omniauth_callbacks.success', kind: 'Google'
      sign_in user, store: false
      render json: { auth_token: JsonWebToken.encode(user_id: user.id) }
    else
      #flash[:alert] = t 'devise.omniauth_callbacks.failure', kind: 'Google', reason: "#{auth.info.email} is not authorized."
      puts "#{auth.info.email} is not authorized."
      redirect_to resources_path
    end
  end

  protected

  def after_omniauth_failure_path_for(_scope)
    resources_path
  end

  def after_sign_in_path_for(resource_or_scope)
    stored_location_for(resource_or_scope)
  end

  private

  def auth
    @auth ||= request.env['omniauth.auth']
  end
end