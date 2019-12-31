class CharactersController < ActionController::API
  decrease_stats
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
        new_char = Character.create({user_id: params[:user_id], image: params[:img], name: params[:name], hungry: 75, thirsty: 75, sleepy: 75, social: 75, status: "cool"})
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
    def decrease_stats
      while true do
        characters = Character.all
        characters.each do |character|
          character.update({hungry: character.hungry -2, thirsty: character.thirsty -5, sleepy: character.sleepy-1, social: character.social-2})
        end
        sleep 10
      end

    end
end