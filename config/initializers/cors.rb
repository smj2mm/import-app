# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# According to https://blog.devgenius.io/create-a-rails-api-with-react-frontend-using-hooks-and-typescript-dcb4e84c3dbf
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*" # "http://localhost:3000" for development or production URL

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
