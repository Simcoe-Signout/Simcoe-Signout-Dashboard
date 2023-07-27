Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, '363347043044-gf9r1drk66uqvcmc6esqk02his5lv8jv.apps.googleusercontent.com', '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', skip_jwt: true, scope: 'email, profile', redirect_uri: 'http://simcoe-signout-api.ian-tapply.me', callback_path: '/users/auth/google_oauth2/callback'
end
OmniAuth.config.allowed_request_methods = %i[get]