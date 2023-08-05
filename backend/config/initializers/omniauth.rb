Rails.application.config.middleware.use OmniAuth::Builder do
    if Rails.env.production?
        if ENV['RESTRICT_LOGIN_BY_ORGANIZATION'] == 'false'
            provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], skip_jwt: true, scope: 'email, profile', redirect_uri: 'https://simcoe-signout-api.ian-tapply.me/users/auth/google_oauth2/callback'
        else
            provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], skip_jwt: true, scope: 'email, profile', hd: 'dsbn.org', redirect_uri: 'https://simcoe-signout-api.ian-tapply.me/users/auth/google_oauth2/callback'
        end
    else
        provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], skip_jwt: true, scope: 'email, profile', redirect_uri: 'http://127.0.0.1:3000/users/auth/google_oauth2/callback'
    end
end
OmniAuth.config.allowed_request_methods = %i[get]