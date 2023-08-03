Rails.application.config.middleware.use OmniAuth::Builder do
    if Rails.env.production?
        provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], skip_jwt: true, scope: 'email, profile', hd: 'dsbn.org', redirect_uri: 'https://simcoe-signout-api.ian-tapply.me/users/auth/google_oauth2/callback'
    else
        provider :google_oauth2, '363347043044-o6c4in4kfkfel9rnf6f71phd3or2gdvl.apps.googleusercontent.com', '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', skip_jwt: true, scope: 'email, profile', redirect_uri: 'http://localhost/users/auth/google_oauth2/callback'
    end
end
OmniAuth.config.allowed_request_methods = %i[get]