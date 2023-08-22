class Api < Grape::API

  mount Admin::Root
  mount Core::Root
end