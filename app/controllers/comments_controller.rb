class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = params[:user_id]
    @comment.project_id = params[:project_id]
    if @comment.save
      flash[:notice] = 'You have successfully posted a comment'
      redirect_to category_project_path(params[:category_id], @comment.project_id)
    else
      flash[:alert] = 'There was an error in posting the comment'
      redirect_to category_project_path(params[:category_id], @comment.project_id)
    end
  end

  def show
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    flash[:error] = 'You have successfully removed a comment'
    redirect_to category_project_path(params[:category_id], params[:project_id])
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :comment, :project_id, :category_id)
  end
end
