Rails.application.routes.draw do
  resources :tour_breweries
  resources :scheduled_tours
  resources :brewery_reviews
  resources :breweries
  resources :tours
  resources :users
  post '/login', to: 'sessions#create'
  get '/logged-in-user', to: 'sessions#show'
  delete '/logout', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
