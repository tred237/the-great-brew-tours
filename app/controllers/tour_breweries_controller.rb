class TourBreweriesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        if creator.is_admin
            breweries = []
            params[:breweries].map do |b|
                if !TourBrewery.exists?(tour_id: params[:tour_id], brewery_id: b)
                    brewery = Tour.find(params[:tour_id]).tour_breweries.create!(brewery_id: b)
                    breweries.push brewery
                end 
            end
            render json: breweries, status: :created
        else
            render json: { errors: ["You are not authorized to add a brewery to a tour"] }, status: :unauthorized
        end
    end

    def destroy
        destroyer = find_user
        if creator.is_admin
            tour_brewery = TourBrewery.find(params[:id])
            tour_brewery.destroy
            head :no_content
        else
            render json: { errors: ["You are not authorized to delete a brewery from a tour"] }, status: :unauthorized
        end
    end
end