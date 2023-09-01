module Core
    module Resources
        class Base < Grape::API
            prefix 'api/core/resources'
  
            mount Get
            mount GetOne
        end
    end
end