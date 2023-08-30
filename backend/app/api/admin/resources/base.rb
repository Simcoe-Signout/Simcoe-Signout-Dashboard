module Admin
    module Resources
        class Base < Grape::API
            prefix 'api/admin/resources'
  
            mount Ping
        end
    end
end