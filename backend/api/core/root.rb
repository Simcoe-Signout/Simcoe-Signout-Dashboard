class Core < Grape::API
  # General Setup
  version 'v1', using: :accept_version_header
  format :json
  prefix :api

  # Global Error Handling
  rescue_from Grape::Exceptions::ValidationErrors do |e|
    # Gracefully handle plz
  end
  rescue_from ActiveRecord::RecordNotFound do |e|
    # Gracefully handle plz
  end
  rescue_from :all do |e|
    # Gracefully handle plz
  end

  helpers do
    def current_user
      @current_user ||= User.authorize!(env)
    end

    def authenticate!
      error!('401 Unauthorized', 401) unless current_user
    end
  end

  # Swagger mount?
end
