require 'byebug'
class TourBreweriesController < ApplicationController
    def create
        # change to session id
        creator = find_creator
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
            render json: {errors: ["You are not authorized to add a brewery to a tour"]}, status: :unauthorized
        end
    end
end