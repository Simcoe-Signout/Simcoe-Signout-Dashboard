class Api < Grape::API
  require 'grape_logging'

  mount Admin::Root
  mount Core::Root
end