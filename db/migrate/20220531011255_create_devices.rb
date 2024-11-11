class CreateDevices < ActiveRecord::Migration[7.0]
  def change
    create_table :devices do |t|
      t.string :name
      t.json :os_details
      t.string :type
      t.string :missing
      t.string :state
      t.json :location

      t.timestamps
    end
  end
end
