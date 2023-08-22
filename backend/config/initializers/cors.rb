Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ['simcoesignout.com', '127.0.0.1:5173', 'api.simcoesignout.com']

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
      credentials: true
  end
end