class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message_broken_out

    def create
        user = User.create!(user_params)
        render json: user, status: :created  
    end

    private

    def user_params
        params.permit(:username, :email, :birth_date, :password, :password_confirmation)
    end
end
