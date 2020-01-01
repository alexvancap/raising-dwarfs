class CreateCharlist < ActiveRecord::Migration[6.0]
  def change
    create_table :charlists do |t|
      t.string(:name)
      t.string(:price)
      t.string(:image)
      t.integer(:earnings)
    end
  end
end
