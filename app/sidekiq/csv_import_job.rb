class CsvImportJob
  include Sidekiq::Job

  def perform(file_contents)
    begin
      CsvImportService.new(file_contents).import
      # render json: { message: 'CSV imported successfully.' }, status: :created
    rescue => e
      # render json: { error: "Error processing CSV file: #{e.message}" }, status: :bad_request
      print "Error processing CSV file: #{e.message}"
    end
  end
end
