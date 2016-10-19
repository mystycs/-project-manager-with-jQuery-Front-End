class Comment < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  validates_presence_of :comment

  def self.filter_comments(projectid)
    where(['project_id = ?', projectid])
  end

  def get_name_from_user_id(user_id)
    User.find(user_id).full_name
  end
end
