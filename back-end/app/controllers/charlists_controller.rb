class CharlistsController < ActionController::API
    def index
        character_list = Charlist.all
        render json: character_list
    end
end