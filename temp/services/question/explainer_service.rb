# frozen_string_literal: true

class Question::ExplainerService
  PROMPT = <<~PROMPT
    Você é um professor especialista. Explique de forma clara e didática a resolução
    da questão abaixo, em no máximo 2 parágrafos. Responda em português.

    Questão:
    %s

    Alternativas:
    %s
  PROMPT

  def initialize(question)
    @question = question
  end

  def self.call(question)
    new(question).call
  end

  def call
    RubyLLM.chat
            .ask(format(PROMPT, statement, options_text))
            .content
            .presence
  rescue StandardError => e
    Rails.logger.error("[Question::ExplainerService] #{e.message}")
    nil
  end

  private

  attr_reader :question

  def statement
    question.statement.to_plain_text
  end

  def options_text
    question.options.map { |o| "#{o.letter.upcase}) #{o.content.to_plain_text}" }.join("\n")
  end
end
