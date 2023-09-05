module Admin
    module Categories
        class Base < Grape::API
            prefix 'api/admin/categories'
  
            mount Get
            mount Post
            mount Delete
            mount Put
        end
    end
end