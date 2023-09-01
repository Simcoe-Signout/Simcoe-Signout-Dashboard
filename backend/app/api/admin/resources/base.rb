module Admin
    module Resources
        class Base < Grape::API
            prefix 'api/admin/resources'
  
            mount Post
            mount Delete
        end
    end
end