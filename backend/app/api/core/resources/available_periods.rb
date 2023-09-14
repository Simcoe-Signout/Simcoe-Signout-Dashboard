module Core
  module Resources
    class AvailablePeriods < Grape::API
      
      params do
        requires :id, type: Integer
      end

      get :available_periods do
        resource = Resource.find_by_id(params[:id])

        available_periods = [1, 2, 3, 4]

        disabled_periods = resource.disabledPeriods || []

        periods = available_periods - disabled_periods
        present(periods)
      end
    end
  end
end