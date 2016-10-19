class TasksController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def create
    @task = Task.new(comment_params)
    @task.project_id = params[:project_id]
    @task.completed = false
    if @task.save
      flash[:notice] = 'Task successfully created'
      redirect_to category_project_path(params[:category_id], @task.project_id)
    else
      flash[:alert] = 'There was an error in creating the task'
      redirect_to category_project_path(params[:category_id], @task.project_id)
    end
  end

  def completed
    @task = Task.find(params[:id])
    @task.update_attributes(completed: true)
    flash[:error] = 'Task marked completed'
    redirect_to category_project_path(params[:category_id], params[:project_id])
  end

  private

  def comment_params
    params.require(:task).permit(:task, :project_id, :category_id)
  end
end
