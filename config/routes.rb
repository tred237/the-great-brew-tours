Rails.application.routes.draw do
  resources :tour_breweries, only: [:create]
  resources :scheduled_tours, only: [:index, :create, :update, :destroy]
  resources :brewery_reviews, only: [:create, :update, :destroy]
  resources :breweries, only: [:index, :show, :create, :update]
  resources :tours, only: [:create, :destroy]
  resources :users, only: [:create]
  post '/login', to: 'sessions#create'
  get '/logged-in-user', to: 'sessions#show'
  delete '/logout', to: 'sessions#destroy'
  get '/reviewed-breweries', to: 'breweries#reviewed_breweries'
  get '/tours/:year/:month/:day', to: 'tours#tours_on_date'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
