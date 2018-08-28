Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :edit, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :clubs, only: [:create, :edit, :show, :index]
    resources :courts, only: [:create, :edit, :show, :index]
    resources :bookings, only: [:create, :destroy, :show, :index]
    resources :availabilities, only: [:create, :show, :destroy, :index]
    resources :results, only: [:create, :edit, :destroy]
    resources :rosters, only: [:create, :destroy]
    resources :memberships, only: [:create, :destroy]
    resources :teams, only: [:create, :edit, :show, :destroy]
    resources :events, only: [:create, :edit, :show, :destroy]
    resources :signups, only: [:create, :edit, :show, :destroy]
    get '/user/pros', to: 'users#pros'
  end
end
