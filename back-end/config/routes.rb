Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get ("/characters/:id"), to: ("characters#index")
  get ("/characters"), to: ("characters#index")

end
