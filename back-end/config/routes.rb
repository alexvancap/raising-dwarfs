Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get ("/characters/:id"), to: ("characters#index")
  get ("/characters"), to: ("characters#index")

  post ("/characters/create"), to: ("characters#create")
  get ("/characters/:id/find-user"), to: ("characters#find_user_by_id")
  get ("/users/:id/getmoney"), to: ("users#get_money")
  post ("/users/:id/substract-money"), to: ("users#substract_money")
  get ("/list-chars"), to: ("charlists#index")
end
