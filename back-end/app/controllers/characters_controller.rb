class CharactersController < ActionController::API
  def index
    characters = Character.all
    render json: characters
  end
    def find_characters_by_id
      params[:id]
        user = User.find(params[:id])
        character = user.characters
        render json: character
    end
    def create
        new_char = Character.create({user_id: params[:user_id], image: params[:image], name: params[:name], earnings: params[:earnings], hungry: 75, thirsty: 75, sleepy: 75, social: 75, status: "awake"})
        render json: new_char
    end

    def update
      character = Character.find(params[:character])
      character.update({status: params[:status]})
      render json: character
    end
end