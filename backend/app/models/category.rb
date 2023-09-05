class Category < ApplicationRecord
    def find_by_title(title)
        where(title: title).first
    end

    def find_by_id(id)
        where(id: id).first
    end
end
