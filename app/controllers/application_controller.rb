class ApplicationController < ActionController::API
    include ActionController::Cookies

    private

    def unprocessable_entity_error_message(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
