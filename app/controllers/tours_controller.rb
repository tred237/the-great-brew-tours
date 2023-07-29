class ToursController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message_broken_out
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        if creator.is_admin
            if !params[:breweries][0]
                render json: { errors: {tour_breweries: ["You need include at least one brewery to create a tour"]} }, status: :unprocessable_entity
            else
                tour = Tour.new(tour_params)
                tour.creator = creator
                tour.save!
                render json: tour, status: :created
            end
        else
            render json: { errors: ["You are not authorized to add a tour"] }, status: :unauthorized
        end
    end

    # def index
    #     user = find_user
    #     if user.is_admin
    #         tours = Tour.all
    #         render json: tours, status: :ok
    #     else
    #         render json: valid_tours, status: :ok
    #     end
    # end

    # def update
    #     updater = find_user
    #     if updater.is_admin
    #         tour = find_tour
    #         tour.update!(tour_params)
    #         render json: tour, status: :ok
    #     else
    #         render json: { errors: ["You are not authorized to edit a tour"] }, status: :unauthorized
    #     end
    # end

    def destroy
        destroyer = find_user
        if destroyer.is_admin
            tour = find_tour
            tour.destroy
            render json: tour, status: :ok
        else
            render json: { errors: ["You are not authorized to delete a tour"] }, status: :unauthorized
        end
    end

    def tours_on_date
        user = find_user
        if user.is_admin
            tours = Tour.where("tour_date::date = '#{params[:year]}-#{params[:month]}-#{params[:day]}'")
            render json: tours, status: :ok
        else
            render json: valid_tours, status: :ok
        end
    end

    private

    def find_tour
        Tour.find(params[:id])
    end

    def tour_params
        params.permit(:tour_date, :duration, :meeting_location, :available_slots)
    end

    def has_scheduled_tour(tour_id)
        ScheduledTour.find_by(tour_id: tour_id, user_id: session[:user_id])
    end

    def valid_tours
        tours = Tour.where("tour_date::date = '#{params[:year]}-#{params[:month]}-#{params[:day]}'")
        scheduled_tour_agg = ScheduledTour.group(:tour_id).sum(:number_of_people)
        tours.filter{|t| t.tour_date.to_date > Date.today and (has_scheduled_tour(t.id) or !scheduled_tour_agg[t.id] or scheduled_tour_agg[t.id] < t.available_slots)}
    end
end
