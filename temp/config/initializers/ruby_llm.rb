# frozen_string_literal: true

require "ruby_llm"

RubyLLM.configure do |config|
  # Default Gemini API provided.
  config.gemini_api_key = ENV["GEMINI_API_KEY"]
  config.default_model = "gemini-2.5-flash"

  # Use the Rails logger.
  config.logger = Rails.logger
end
