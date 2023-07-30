# module Booking
#     module V1
#       class Root < Grape::API
#         format :json
#         prefix 'api/booking'
#         version 'v1', using: :path
  
#         # Helper method to authenticate admin
#         helpers Helpers::Authentication
  
#         # Authenticate all requests
#         before do
#           authenticate_request
#           authenticate_admin
#         end
  
#         # Mount all booking related endpoints
#         mount Bookings::Base
  
#         add_swagger_documentation(
#           hide_documentation_path: true,
#           api_version: 'v1',
#           mount_path: "/documentation",
#         )
#       end
#     end
#   end
  