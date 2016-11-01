class CategoriesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def new
    @category = Category.new
  end

  def show
    @project = Project.new

    # @category = Category.find(params[:id])
    @category = Category.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @category }
    end
  end

  def index
    @categories = Category.all
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      flash[:notice] = 'Category successfully created'
      redirect_to category_path(@category)
    else
      flash[:alert] = 'Category could not be created'
      render 'new'
    end
  end

  private

  def category_params
    params.require(:category).permit(:title)
  end
end
