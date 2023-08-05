Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ['simcoe-signout.ian-tapply.me', '127.0.0.1:5173', 'simcoe-signout-api.ian-tapply.me']

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
      credentials: true
  end
end