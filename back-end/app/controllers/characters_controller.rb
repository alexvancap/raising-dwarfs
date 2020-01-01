class CharactersController < ActionController::API
  def index
    characters = Character.all
    render json: characters
  end
    def find_user_by_id
        user = User.find(params[:id])
        character = user.characters
        render json: character
    end
    def create
        new_char = Character.create({user_id: params[:user_id], image: params[:image], name: params[:name], earnings: params[:earnings], hungry: 75, thirsty: 75, sleepy: 75, social: 75, status: "cool"})
        render json: new_char
    end

    def update
      user = User.find(params[:id])
      characters = user.characters
      characters.each do |character|
        character.update({hungry: params[:hungry]})
      end
      render json: characters
    end
end