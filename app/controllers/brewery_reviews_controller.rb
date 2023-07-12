class BreweryReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error_message
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error_message

    def create
        creator = find_user
        brewery_review = creator.brewery_reviews.create!(brewery_review_params)
        render json: brewery_review, status: :created
    end

    def update
        updater = find_user
        brewery_review = updater.brewery_reviews.find(params[:id])
        params[:is_edited] = true
        brewery_review.update!(update_brewery_review_params)
        render json: brewery_review, status: :ok
    end

    def destroy
        destroyer = find_user
        brewery_review = BreweryReview.find(params[:id])
        if destroyer.is_admin
            brewery_review.destroy
            render json: brewery_review, status: :ok
        else
            render json: { errors: ["You are not authorized to delete this review"] }, status: :unauthorized
        end
    end

    private

    def brewery_review_params
        params.permit(:review, :is_recommended, :brewery_id)
    end

    def update_brewery_review_params
        params.permit(:review, :is_recommended, :is_edited)
    end
end
