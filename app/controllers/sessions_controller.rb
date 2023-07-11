class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    rescue_from ActiveRecord::RecordNotFound, with: :user_unauthorized_response

    def create
        user = User.find_by("username = ? or email = ?", params[:user], params[:user])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: ["Invalid login credentials"] }, status: :unauthorized
        end
    end

    def show
        user = User.find(session[:user_id])
        render json: user, status: :ok
    end

    def destroy
        session.delete :user_id
        render json: { message: "Logged Out" }, status: :ok
    end

    private

    def user_unauthorized_response(invalid)
        render json: { error: "Not Authorized" }, status: :unauthorized
    end
end
