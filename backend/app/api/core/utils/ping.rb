# frozen_string_literal: true
module Core
    module Utils
      class Ping < Grape::API
        params do
            optional :start_time, type: Time
        end
  
        get :ping do
          # present a pong response but with the ms response time
          @start_time = params[:start_time] || Time.now
          elapsed_time = Time.now - @start_time
          present('Pong! Response time' => "#{(elapsed_time) * 1000}ms")
        end
      end
    end
  end
    