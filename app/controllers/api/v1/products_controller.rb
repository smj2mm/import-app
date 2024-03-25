class Api::V1::ProductsController < ApplicationController
  # before_action :set_product, only: %i[ show update destroy ]

  def import_csv
    <<-DOC
    Import CSV file to database.
    DOC
    file = params[:file]

    if file.present? && file.content_type == 'text/csv'
      CsvImportJob.perform_async(file.read)
    else
      render json: { error: 'Invalid CSV file.' }, status: :unprocessable_entity
    end
  end

  # GET /products
  def index
    <<-DOC
    Get all products JSONified. Used for testing purposes only. 
    Remove or add security measures before deploying to production.
    DOC
    @products = Product.all
    render json: @products
  end

  def get_products
    <<-DOC
    Fetch products by category in format {[category]: Product[]}, where 
    category is a string defined as the first three characters in the
    product_iid.
    
    TODO: Add pagination.
    DOC
    @products_by_category = Product.all.group_by { |product| product.product_id[0..2] }
    render json: { products_by_category: @products_by_category }
  end

  private
    # Private methods here

end
