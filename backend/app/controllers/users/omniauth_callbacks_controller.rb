include ActionController::Cookies
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def google_oauth2
    user = User.from_omniauth(auth)

    if user.present?
      if user.email.ends_with?('@dsbn.org') || user.email == 'iantapply22@gmail.com' || user.email == 'iantapply17@gmail.com'
        sign_in user, store: false
        auth_token = JsonWebToken.encode(user_id: user.id, user_full_name: user.full_name, user_role: user.role)
        cookies[:auth_token] = {
          value: auth_token,
          domain: Rails.env.production? ? '.simcoesignout.com' : '127.0.0.1',
          expires: 30.minutes
        }
        render html: "<script>window.opener.postMessage({ auth_token: '#{auth_token}' }, '*'); window.close();</script>".html_safe, layout: false
      else
        puts "#{auth.info.email} is not authorized."
        redirect_to "https://simcoesignout.com", allow_other_host: true
      end
    end
  end

  protected

  def after_omniauth_failure_path_for(_scope)
    "https://simcoesignout.com"
  end

  def after_sign_in_path_for(resource_or_scope)
    stored_location_for(resource_or_scope)
  end

  private

  def auth
    @auth ||= request.env['omniauth.auth']
  end
end