class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  # def self.create_from_provider_data(provider_data)
  #   puts "provider_data: #{provider_data}"
  # end
  def self.create_from_provider_data(provider_data)
    user = User.where(provider: provider_data.provider, uid: provider_data.uid).first

    unless user
      user = User.create(
        provider: provider_data.provider,
        uid: provider_data.uid,
        email: provider_data.info.email,
      )
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.full_name = auth.info.name
      user.avatar_url = auth.info.image
      # user.skip_confirmation!
    end
  end
end
