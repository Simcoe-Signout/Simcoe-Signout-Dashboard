Rails.application.config.before_initialize do
    Rails.application.config.session_store :cookie_store, key: '_api_session', secure: true, httponly: true
  end
  