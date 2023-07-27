Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], skip_jwt: true, scope: 'email, profile', redirect_uri: 'https://simcoe-signout-api.ian-tapply.me/users/auth/google_oauth2/callback'
end
OmniAuth.config.allowed_request_methods = %i[get]