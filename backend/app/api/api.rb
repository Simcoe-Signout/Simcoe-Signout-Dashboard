class Api < Grape::API
    format :json
    prefix :api
    
    mount Booking::V1::Root
    # mount Resource::V1::Root
    # mount User::V1::Root
end