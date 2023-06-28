class BreweriesController < ApplicationController
    def create
        # change to session id
        creator = User.find(params[:creator_id])
        if creator.is_admin
            brewery = Brewery.new(brewery_params)
            brewery.creator = creator
            brewery.save!
            render json: brewery, status: :created
        else
            render json: {errors: ["You are not authorized to add a brewery"]}, status: :unauthorized
        end
    end

    private

    def brewery_params
        params.permit(:name, :website, :address, :city, :postal_code, :latitude, :longitude)
    end
end
