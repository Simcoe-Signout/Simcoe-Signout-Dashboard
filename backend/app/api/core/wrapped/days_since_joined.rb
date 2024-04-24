# frozen_string_literal: true

module Core
    module Wrapped
      class DaysSinceJoined < Grape::API
  
        get :days_since_joined do
            @user = current_user
            joinDate = @user.created_at
            currentDate = Time.now
            daysSinceJoined = (currentDate - joinDate).to_i / 86400
            daysSinceJoined
        end
      end
    end
end
  