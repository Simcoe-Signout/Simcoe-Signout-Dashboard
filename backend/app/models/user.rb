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
    if auth.present? && (auth.info.email.ends_with?('@dsbn.org') || auth.info.email == 'iantapply22@gmail.com' || auth.info.email == 'iantapply17@gmail.com' || auth.info.email == 'dacotahj.harvey@gmail.com')
      where(uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.full_name = auth.info.name
        user.avatar_url = auth.info.image
        # user.skip_confirmation!
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