Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get ("/characters/:id"), to: ("characters#index")
  get ("/characters"), to: ("characters#index")
  #patch ("/characters/:id"), to: ("characters#update")
  post ("/characters/:id/update"), to: ("characters#update")
  get ("/characters/decrease-stats"), to: ("characters#decrease_stats")
  post ("/login"), to: ("users#login")
  post ("/registe"), to: ("users#create")

  post ("/characters/create"), to: ("characters#create")
  get ("/characters/:id/find-user"), to: ("characters#find_characters_by_id")
  get ("/users/:id/getmoney"), to: ("users#get_money")
  post ("/users/:id/substract-money"), to: ("users#substract_money")
  get ("/list-chars"), to: ("charlists#index")
end
