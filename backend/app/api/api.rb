class Api < Grape::API
    format :json
    prefix :api
    
    mount Booking::V1::Root
end