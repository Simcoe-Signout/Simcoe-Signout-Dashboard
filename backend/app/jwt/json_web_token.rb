class JsonWebToken

    class << self
   
      def encode(payload, exp = 30.minutes.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, ENV['JWT_ENCRYPTION_KEY'])
      end
   
      def decode(token)
        body = JWT.decode(token, ENV['JWT_ENCRYPTION_KEY'])[0]
        HashWithIndifferentAccess.new body
      rescue
        nil
      end
    end
   end