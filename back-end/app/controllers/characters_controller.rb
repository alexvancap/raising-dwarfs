class CharactersController < ActionController::API
  def index
    @characters = Character.all
    render json: @characters
  end
end