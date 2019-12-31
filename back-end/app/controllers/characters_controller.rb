class CharactersController < ActionController::API
  def index
    @characters = Character.all
    render json: @characters
  end
    def find_user_by_id
        user = User.find(params[:id])
        character = user.characters
        render json: character
    end
    def create
        new_char = Character.create({user_id: params[:user_id], image: params[:img], name: params[:name], hungry: 75, thirsty: 75, sleepy: 75, social: 75, status: "cool"})
        render json: new_char
    end
end