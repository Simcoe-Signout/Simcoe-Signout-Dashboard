module Core
    module Categories
        class Base < Grape::API
            prefix 'api/core/categories'
  
            mount GetOne
            mount Get
        end
    end
end