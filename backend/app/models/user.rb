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
    if auth.present? && (ENV.fetch('ALLOWED_EMAIL_DOMAINS').split(',').any? { |domain| auth.info.email.end_with?(domain.strip) } || ENV.fetch('ALLOWED_EMAILS').include?(auth.info.email))
      where(uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.full_name = auth.info.name
        user.avatar_url = auth.info.image
      end
    else
      # Return nil if the auth object is nil or the email address is not valid
      nil
    end
  end

  def self.find_by_id(id)
    where(id: id).first
  end
end