class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :authorize

    def authorize
        render json: { errors: "You are not authorized to complete this action" }, status: :unauthorized unless session.include? :user_id
    end

    private

    def find_user
        User.find(session[:user_id])
    end

    def unprocessable_entity_error_message(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found_error_message(invalid)
        render json: { errors: [invalid.message.split(' with')[0]] }, status: :not_found
    end
end
