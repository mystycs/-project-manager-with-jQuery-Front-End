class ProjectsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def new
    @project = Project.new
    if Category.find_by(id: params[:category_id]) != nil
      @category = Category.find_by(id: params[:category_id])
      @category = @category.id
    else
      @category = []
  end
    # @project.categories.build
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    flash[:error] = 'You have successfully deleted this project.'
    redirect_to project_manager_path
  end

  def create
    @project = Project.create(project_params)
    @project.user_id = current_user.id
    if @project.save
      flash[:notice] = 'Project successfully created'
      redirect_to category_project_path(ProjectCategory.limit(1).where(project_id: [@project]).pluck(:category_id), @project)
    else
      flash[:alert] = 'Project could not be created'
      render 'new'
    end
  end

  def show
    # @project = Project.find(params[:id])

    # @project = Project.find(params[:id])
    #
    # respond_to do |f|
    #       f.html { render :show }
    #       f.json { render json: @project }
    # end

    if params[:category_id]
      @category = Category.find_by(id: params[:category_id])

      @project =  @category.projects.find_by(id: params[:id])

      @user = User.find(@project.user_id).full_name
      @comment = Comment.new
      @comments = Comment.filter_comments(@project.id)
      @task = Task.new
      @tasks = Task.filter_tasks(@project.id)

      if @project.nil?
        redirect_to category_projects(@project), alert: 'Project not found'
      end
    else
      @project = Project.find(params[:id])
      end

    response = { # project: @project, tasks: @tasks, comments: @comments, user: @user
      project: @project, tasks: @tasks, comments:  @comments, user: @user
    }

    respond_to do |format|
      format.html { render :show }
      format.json { render json: response }
    end

    # respond_to do |format|
    #       format.html { render :show }
    #       format.json { render json: @project.to_json(include  {tasks: @tasks})}
    # end
  end

  def index
    @projects = Project.all
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :task_id, :category_id, category_ids: [], categories_attributes: [:title])
  end
end
