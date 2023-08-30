module Admin
    module Users
        class Base < Grape::API
            prefix 'api/admin/users'
  
            mount Ping
        end
    end
end