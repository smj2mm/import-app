# app/services/csv_import_service.rb
require 'csv'

class CsvImportService
  <<-DOC
  Service used to import CSV files to the database.
  DOC

  def initialize(file_contents)
    @file = CSV.parse(file_contents, headers:true)
  end

  def import
    products = []
    # p "File in service: #{@file}"
  
    @file.each do |row|
      begin
        validate_row(row)
        products << Product.new(
          date: row['date'],
          product_id: row['product_id'],
          weight: row['weight'].to_f,  # Convert weight to a float
          unit: row['unit']
        )
      rescue => e
        raise "Error processing row: #{row}. Error: #{e.message}"
      end
    end
  
    Product.import(
      products, on_duplicate_key_update: { 
        conflict_target: [:product_id], columns: [:date, :weight, :unit]
      }
    )
  end
end

def validate_row(row)
  check_fields_present(row)
  check_weight_valid(row)
  check_product_id_format(row)
end

def check_fields_present(row)
  %w[date product_id weight unit].each do |field|
    raise "Missing field: #{field}" unless row[field]
  end
end

def check_weight_valid(row)
  unless valid_float?(row['weight'])
    raise "Invalid weight: #{row['weight']}"
  end
end

def check_product_id_format(row)
  unless row['product_id'] =~ /^[a-zA-Z]{3}-/
    raise "Invalid product_id: #{row['product_id']}"
  end
end

def valid_float?(str)
  !!Float(str) rescue false
end
