require 'byebug'
class TourBreweriesController < ApplicationController
    def create
        # change to session id
        creator = User.find(params[:creator_id])
        if creator.is_admin
            breweries = []
            current_tour_breweries = TourBrewery.where("tour_id = #{params[:tour_id]}").map{|t| t.brewery_id}
            params_breweries = params[:breweries].filter{ |b| !current_tour_breweries.include? b}
            if params_breweries.length > 0
                params_breweries.map do |b|
                    brewery = TourBrewery.create!(tour_id: params[:tour_id], brewery_id: b)
                    breweries.push brewery
                end
            end
            render json: breweries, status: :created
        else
            render json: {errors: ["You are not authorized to add a brewery to a tour"]}, status: :unauthorized
        end
    end
end
