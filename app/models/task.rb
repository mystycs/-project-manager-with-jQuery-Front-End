class Task < ActiveRecord::Base
  belongs_to :project

  validates_presence_of :task

  def self.filter_tasks(projectid)
    where(['project_id = ?', projectid])
  end
end
