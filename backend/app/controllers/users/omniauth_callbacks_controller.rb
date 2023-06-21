class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    user = User.from_omniauth(auth)

    if user.present?
      #sign_out_all_scopes
      puts "user: #{user}. Success! Signed in: #{user.email}"
      #flash[:success] = t 'devise.omniauth_callbacks.success', kind: 'Google'
      sign_in user, store: false
      # redirect_to "http://localhost:5173/resources", allow_other_host: true
      # render json: {
      #   status: 'SUCCESS',
      #   message: "user was successfully logged in through #{params[:provider]}",
      #   body: {
      #     email: user.email
      #   }
      # },
      #        status: :created
      
      redirect_to resources_path
    else
      #flash[:alert] = t 'devise.omniauth_callbacks.failure', kind: 'Google', reason: "#{auth.info.email} is not authorized."
      puts "#{auth.info.email} is not authorized."
      redirect_to resources_path
    end
  end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  protected

  def after_omniauth_failure_path_for(_scope)
    resources_path
  end

  def after_sign_in_path_for(resource_or_scope)
    stored_location_for(resource_or_scope)
  end

  private

  # def from_google_params
  #   @from_google_params ||= {
  #     uid: auth.uid,
  #     email: auth.info.email,
  #     full_name: auth.info.name,
  #     avatar_url: auth.info.image
  #   }
  # end

  def auth
    @auth ||= request.env['omniauth.auth']
  end
end