class ToursController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        if creator.is_admin
            tour = Tour.new(tour_params)
            tour.creator = creator
            tour.save!
            render json: tour, status: :created
        else
            render json: { errors: ["You are not authorized to add a tour"] }, status: :unauthorized
        end
    end

    def index
        user = find_user
        if user.is_admin
            tours = Tour.all
            render json: tours, status: :ok
        else
            render json: exclude_full_tours, status: :ok
        end
    end

    def update
        updater = find_user
        if updater.is_admin
            tour = find_tour
            tour.update!(tour_params)
            render json: tour, status: :ok
        else
            render json: { errors: ["You are not authorized to edit a tour"] }, status: :unauthorized
        end
    end

    def destroy
        destroyer = find_user
        if destroyer.is_admin
            tour = find_tour
            tour.destroy
            head :no_content
        else
            render json: { errors: ["You are not authorized to delete a tour"] }, status: :unauthorized
        end
    end

    private

    def find_tour
        Tour.find(params[:id])
    end

    def tour_params
        params.permit(:tour_date, :duration, :meeting_location, :available_slots)
    end

    def exclude_full_tours
        tours = []
        scheduled_tour_agg = ScheduledTour.group(:tour_id).sum(:number_of_people)
        scheduled_tour_agg.each do |k,v|
            tour = Tour.find(k)
            tours.push tour unless v >= tour.available_slots
        end
        tours
    end
end
