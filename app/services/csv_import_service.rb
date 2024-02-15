# app/services/csv_import_service.rb
require 'csv'

class CsvImportService
  <<-DOC
  Service used ti import CSV files to the database.

  TODO: Add error handling for invalid CSV files, etc.
  DOC
  def initialize(file)
    @file = file
  end

  def import
    products = []
  
    CSV.foreach(@file.path, headers: true) do |row|
      products << Product.new(
        date: row['date'],
        product_id: row['product_id'],
        weight: row['weight'].to_f,  # Convert weight to a float
        unit: row['unit']
      )
    end
  
    Product.import(products, on_duplicate_key_update: { conflict_target: [:product_id], columns: [:date, :weight, :unit] })
  end
end
