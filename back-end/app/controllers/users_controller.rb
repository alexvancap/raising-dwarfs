class UsersController < ActionController::API

    def login
        errors = {}
        if logged_in_user = User.find_by({email: params[:username]})
            if logged_in_user.authenticate(params[:password])
                p logged_in_user
                render json: {id: logged_in_user[:id], username: logged_in_user[:username], email: logged_in_user[:email]}
            else
                errors[:password_error] = "Wrong password"
            end
        else 
            errors[:email_error] =  "Wrong email"
        end
        if errors != {}
            render json: errors
        end
    end

    def create
        errors = {}
        if (params[:username])
            if (User.find_by({username: params[:username]}))
            errors[:username_error] = "Your username does already exist"
            else
                if (params[:username].length() < 5)
                    errors[:username_error] = "your username needs to be at lease 5 characters long" 
                end
            end
            if (User.find_by({email: params[:email]}))
                errors[:email_error] = "Your email does already exist"
            end

            if errors == {}
                created_user = User.create(allowed_params)
                render json: created_user
            else
                render json: errors
            end
        else
            errors[:username] = []
        end
        
    end

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