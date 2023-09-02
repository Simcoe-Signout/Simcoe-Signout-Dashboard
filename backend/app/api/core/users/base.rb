module Core
    module Users
      class Base < Grape::API
        prefix 'api/core/users'
  
        mount GetOne
      end
    end
  end