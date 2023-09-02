module Admin
    module Users
        class Get < Grape::API
            get do
                User.all
            end
        end
    end
end