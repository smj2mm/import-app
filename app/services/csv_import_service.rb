# app/services/csv_import_service.rb
require 'csv'

class CsvImportService
  # TODO: Add error handling for invalid CSV files, etc.
  def initialize(file)
    @file = file
  end

  def import
    products = []
    
    CSV.foreach(@file.path, headers: true) do |row|
      products << Product.new(
        date: row['date'],
        product_id: row['product_id'],
        weight: row['weight'],
        unit: row['unit']
      )
    end

    Product.import(products, on_duplicate_key_update: { conflict_target: [:product_id], columns: [:date, :weight, :unit] })
  end
end
