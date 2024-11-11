class Device < ApplicationRecord
    self.inheritance_column = 'inheritance_class'

    validates :state, presence: true, inclusion: ["ok", "missing"]
    validates :name, presence: true
end
