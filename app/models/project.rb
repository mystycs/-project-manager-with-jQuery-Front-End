class Project < ActiveRecord::Base
  belongs_to :category
  belongs_to :user

  has_many :project_categories
  has_many :categories, through: :project_categories

  validates_uniqueness_of :title
  # validates_uniqueness_of :description

  validates_presence_of :title, :description
  validates_presence_of :category_ids, message: 'A category must be present'

  # accepts_nested_attributes_for :categories, :reject_if => proc { |attrs| attrs['title'].blank? }

  def categories_attributes=(categories_attributes)
    categories_attributes.values.each do |category_attribute|
      category = Category.find_or_create_by(category_attribute)
      if category.title?
        categories << category
      elsif category.persisted?
        category.destroy
      end
    end
  end
end
