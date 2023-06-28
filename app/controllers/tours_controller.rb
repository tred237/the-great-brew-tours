require 'byebug'
class ToursController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message

    def create
        # change to session id
        # byebug
        creator = User.find(params[:creator_id])
        if creator.is_admin
            tour = Tour.new(tour_params)
            tour.creator = creator
            tour.save!
            render json: tour, status: :created
        else
            render json: {errors: ["You are not authorized to add a tour"]}, status: :unauthorized
        end
    end

    private

    def tour_params
        params.permit(:tour_date, :duration, :meeting_location, :available_slots)
    end
end
