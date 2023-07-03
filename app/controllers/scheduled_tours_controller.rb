class ScheduledToursController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        tour = Tour.find(params[:tour_id])
        scheduled_tour = creator.scheduled_tours.create!(scheduled_tours_params)
        render json: scheduled_tour, status: :created
    end

    private

    def scheduled_tours_params
        params.permit(:tour_id, :number_of_people)
    end
end
