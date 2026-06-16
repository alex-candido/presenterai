Rails.application.routes.draw do
  namespace :account do
    resource :session
    delete "sessions/:id", to: "sessions#revoke", as: :revoke_account_session
    resources :passwords, param: :token
    resources :users
  end

  namespace :question do
    resources :questions
    resources :question_options
  end

  resources :subjects, only: [ :index ]

  resources :disciplines do
    resources :subjects, except: [ :index, :show ]
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root "dashboard#index"
end
