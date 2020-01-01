class CreateCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string(:name)
      t.string(:image)
      t.integer(:hungry)
      t.integer(:thirsty)
      t.integer(:sleepy)
      t.integer(:social)
      t.string(:status)
      t.integer(:user_id)
      t.integer(:earnings)
    end
  end
end
