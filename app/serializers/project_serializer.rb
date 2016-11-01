class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :user_id
  has_many :categories
  # has_many :tasks
end
