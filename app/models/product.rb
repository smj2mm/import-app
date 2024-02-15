class Product < ApplicationRecord
  validates :date, presence: true
  validates :product_id, presence: true, uniqueness: true
  validates :weight, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :unit, presence: true
end
