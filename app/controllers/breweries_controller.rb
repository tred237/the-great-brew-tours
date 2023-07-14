class BreweriesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        if creator.is_admin
            brewery = Brewery.new(brewery_params)
            brewery.creator = creator
            brewery.save!
            render json: brewery, status: :created
        else
            render json: {errors: ["You are not authorized to add a brewery"]}, status: :unauthorized
        end
    end

    def index
        breweries = Brewery.all
        render json: breweries, status: :ok
    end

    def show
        brewery = find_brewery
        render json: brewery, serializer: SingleBrewerySerializer, status: :ok
    end

    def update
        updater = find_user
        if updater.is_admin
            brewery = find_brewery
            brewery.update!(brewery_params)
            render json: brewery, serializer: SingleBrewerySerializer, status: :ok
        else
            render json: {errors: ["You are not authorized to edit a brewery"]}, status: :unauthorized
        end
    end

    def destroy
        destroyer = find_user
        if destroyer.is_admin
            brewery = find_brewery
            brewery.destroy
            head :no_content
        else
            render json: {errors: ["You are not authorized to delete a brewery"]}, status: :unauthorized
        end
    end

    def reviewed_breweries
        reviewer = find_user
        reviewed_brewery_ids = reviewer.brewery_reviews.order(created_at: :desc).pluck(:brewery_id).uniq
        reviewed_breweries = reviewed_brewery_ids.map{|b| Brewery.find(b)}
        render json: reviewed_breweries, status: :ok
    end

    private

    def find_brewery
        Brewery.find(params[:id])
    end

    def brewery_params
        params.permit(:name, :website, :address, :city, :postal_code, :latitude, :longitude)
    end
end
