# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ['www.simcoesignout.com', 'simcoesignout.com', 'staging.simcoesignout.com', 'api.simcoesignout.com', 'stgapi.simcoesignout.com', '127.0.0.1']

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: %w[access-token expiry token-type Authorization],
             credentials: true
  end
end
