class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]

  def import_csv
    file = params[:file]
    
    if file.present? && file.content_type == 'text/csv'
      CsvImportService.new(file).import
      redirect_to root_path, notice: 'CSV imported successfully.'
    else
      redirect_to root_path, alert: 'Invalid CSV file.'
    end
  end

  # GET /products
  def index
    # BASIC GENERATED CODE TO GET ALL PRODUCTS
    @products = Product.all
    render json: @products
    
    ## VERSION THAT INCLUDES SORTING, ETC
    # @products_by_category = Product.all.group_by { |product| product.product_id[0..2] }
    # @category_totals = calculate_category_totals
    # @import_date = Product.minimum(:date)

    # respond_to do |format|
    #   format.html  { render :index } # Render HTML view
    #   format.json { render json: { products_by_category: @products_by_category, category_totals: @category_totals, import_date: @import_date } }
    # end
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      # render json: @product, status: :created, location: @product
      render json: @product, status: created, location: api_v1_product_path(@product) # api_v1_product_url?
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:date, :product_id, :weight, :unit)
    end

    def calculate_category_totals
      # Product.group(:product_id[0..2]).sum(:weight)
      Product.group("substring(products.product_id FROM 1 FOR 3)").sum(:weight)
    end
end
