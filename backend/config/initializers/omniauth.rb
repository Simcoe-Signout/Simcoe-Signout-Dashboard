Rails.application.config.middleware.use OmniAuth::Builder do
    # You thought this was the actual one, you were wrong! This is just for testing, now get out of this territory! >:(
    provider :google_oauth2, '363347043044-gf9r1drk66uqvcmc6esqk02his5lv8jv.apps.googleusercontent.com', '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', skip_jwt: true, scope: 'email, profile'
end
OmniAuth.config.allowed_request_methods = %i[get]