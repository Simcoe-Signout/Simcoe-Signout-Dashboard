include ActionController::Cookies
module Admin
  class Root < Grape::API
    # General Setup
    version 'v1', using: :accept_version_header
    format :json
    prefix 'api/admin'

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

    before do
      authenticate!
    end

    helpers do
      def current_user
        @current_user ||= @current_user = AuthorizeApiRequest.call(cookies).result
      end

      def authenticate!
        error!('401 Unauthorized', 401) unless current_user && current_user.role == "administrator"
      end
    end

    mount Bookings::Base
    mount Resources::Base
    mount Users::Base
    # Swagger mount?
  end
end