# frozen_string_literal: true

module Core
    module Utils
      class Base < Grape::API
        prefix 'api/core/utils'
  
        mount Ping
      end
    end
  end
  