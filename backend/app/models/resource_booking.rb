class ResourceBooking < ApplicationRecord

    def self.find_by_id(id)
      where(id: id).first
    end
end
