class ScheduledToursController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        tour = Tour.find(params[:tour_id])
        scheduled_tour = creator.scheduled_tours.create!(scheduled_tours_params)
        render json: scheduled_tour, status: :created
    end

    def index
        user = find_user
        scheduled_tours = user.scheduled_tours.all
        render json: scheduled_tours, status: :ok
    end

    def update
        updater = find_user
        scheduled_tour = updater.scheduled_tours.find(params[:id])
        scheduled_tour.update!(update_scheduled_tours_params)
        render json: scheduled_tour, status: :ok
    end

    def destroy
        destroyer = find_user
        scheduled_tour = destroyer.scheduled_tours.find(params[:id])
        scheduled_tour.destroy
        render json: scheduled_tour, status: :ok
    end

    private

    def scheduled_tours_params
        params.permit(:tour_id, :number_of_people)
    end

    def update_scheduled_tours_params
        params.permit(:number_of_people)
    end
end
