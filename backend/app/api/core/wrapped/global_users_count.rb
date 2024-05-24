# frozen_string_literal: true

module Core
    module Wrapped
      class GlobalUsersCount < Grape::API
  
        get :global_users_count do
          users = User.all
          users.count
        end
      end
    end
end
  