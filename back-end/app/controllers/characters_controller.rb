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
      character = Character.find(params[:id])

      update_value = nil
      params[:stats_to_update].each do |key, value|
        if (value > 0)
          if !(character[key] + value > 100)
            update_value = value
          end
        elsif (value < 0)
          if (character[key] + value < 0)
            update_value = value
          else
            character.update({status: "dead"})
          end
        end
            
        if update_value
          character.update({"#{key}": character[key] + value})
        end

      end

      render json: character
    end

    def update_status
      character = Character.find(params[:character])
      character.update({status: params[:status]})
      render json: character
    end

    def find_character
      character = Character.find(params[:id])
      render json: character
    end
end