module Core
    module Resources
        class Get < Grape::API
            get do
                Resource.all
            end
        end
    end
end