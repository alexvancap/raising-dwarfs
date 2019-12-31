Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post ("/characters/create"), to: ("characters#create")
  get ("/characters/:id"), to: ("characters#index")
  get ("/users/:id/getmoney"), to: ("users#get_money")
  post ("/users/:id/substract-money"), to: ("users#substract_money")
  get ("/list-chars"), to: ("charlists#index")
end
