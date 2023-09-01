class Resource < ApplicationRecord

    def find_by_id(id)
        where(id: id).first
    end

    def find_by_name(name)
        where(name: name).first
    end
end
