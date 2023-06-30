require 'byebug'
class ToursController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        # change to session id
        creator = find_creator
        if creator.is_admin
            tour = Tour.new(tour_params)
            tour.creator = creator
            tour.save!
            render json: tour, status: :created
        else
            render json: {errors: ["You are not authorized to add a tour"]}, status: :unauthorized
        end
    end

    def index 
        tours = Tour.all
        render json: tours, status: :ok
    end

    def show
        tour = find_tour
        render json: tour, status: :ok
    end

    def update
        creator = find_creator
        if creator.is_admin
            tour = find_tour
            tour.update!(tour_params)
            render json: tour, status: :ok
        else
            render json: {errors: ["You are not authorized to edit a tour"]}, status: :unauthorized
        end
    end

    def destroy
        creator = find_creator
        if creator.is_admin
            tour = find_tour
            tour.destroy
            head :no_content
        else
            render json: {errors: ["You are not authorized to delete a tour"]}, status: :unauthorized
        end
    end

    private

    def find_tour
        Tour.find(params[:id])
    end

    def tour_params
        params.permit(:tour_date, :duration, :meeting_location, :available_slots)
    end

end
