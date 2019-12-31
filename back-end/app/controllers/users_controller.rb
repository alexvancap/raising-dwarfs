class UsersController < ActionController::API

    def get_money
        user = User.find(params[:id])
        money = user.money
        render json: money
    end

    def substract_money
        user = User.find(params[:id])
        new_money = user.money - params[:money]
        if (new_money >= 0)
            user.update({money: new_money})
            render json: new_money
        else
            render json: {error: "no money"}
        end

    end
end