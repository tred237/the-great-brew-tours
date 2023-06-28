class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message

    def create
        user = User.create!(user_params)
        render json: user, status: :created  
    end

    private

    def user_params
        params.permit(:username, :email, :birth_date, :password, :password_confirmation)
    end

    def unprocessable_entity_error_message(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
