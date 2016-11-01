class ProjectManagerController < ApplicationController
  def index
    # @categories = Category.all
    @categories = Category.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @categories }
    end

    # @projects = Project.all
  end
end
