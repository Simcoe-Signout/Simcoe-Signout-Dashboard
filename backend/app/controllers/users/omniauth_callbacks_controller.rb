include ActionController::Cookies
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :authenticate_request

  def google_oauth2
    user = User.from_omniauth(auth)

    if user.present?
      sign_in user, store: false
      auth_token = JsonWebToken.encode(user_id: user.id, user_role: user.role)
        cookies[:auth_token] = {
          value: auth_token,
          domain: '.ian-tapply.me',
          secure: true,
          httponly: true,
          expires: 30.minutes
        }
      render html: "<script>window.opener.postMessage({ auth_token: '#{auth_token}' }, '*'); window.close();</script>".html_safe, layout: false
    else
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