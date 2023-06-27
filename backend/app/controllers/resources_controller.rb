class ResourcesController < ApplicationController
  before_action :set_resource, only: %i[ show update destroy ]
  before_action :authenticate_admin, only: %i[create update destroy]

  # GET /resources
  def index
    @resources = Resource.all

    render json: @resources
  end

  # GET /resources/1
  def show
    render json: @resource
  end

  # POST /resources
  def create
    @resource = Resource.new(resource_params)

    if @resource.save
      render json: @resource, status: :created, location: @resource
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /resources/1
  def update
    if @resource.update(resource_params)
      render json: @resource
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  # DELETE /resources/1
  def destroy
    @resource.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resource
      @resource = Resource.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def resource_params
      params.require(:resource).permit(:id, :name, :description, :location, :category, tags: [:text, :colour])
    end

    def authenticate_admin
      unless current_user && current_user.role == "administrator"
        render json: { error: 'User does not have permission to access this endpoint.' }, status: :forbidden
      end
    end  
end