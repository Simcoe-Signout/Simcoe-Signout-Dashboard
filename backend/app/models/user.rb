class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  def self.create_from_provider_data(provider_data)
    user = User.where(uid: provider_data.uid).first

    unless user
      User.create(
        uid: provider_data.uid,
        email: provider_data.info.email,
      )
    end
  end

  def self.from_omniauth(auth)
    where(uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.full_name = auth.info.name
      user.avatar_url = auth.info.image
      # user.skip_confirmation!
    end
  end
end
