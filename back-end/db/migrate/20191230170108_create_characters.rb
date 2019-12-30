class CreateCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string(:name)
      t.integer(:hungry)
      t.integer(:thirsty)
      t.integer(:sleepy)
      t.integer(:social)
      t.string(:status)
      t.integer(:user_id)
    end
  end
end
