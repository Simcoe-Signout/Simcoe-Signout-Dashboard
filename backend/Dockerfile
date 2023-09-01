FROM ruby:3.0.6

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client build-essential

WORKDIR /app

COPY Gemfile* ./

RUN bundle install

COPY . .

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]