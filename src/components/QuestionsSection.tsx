import React, { useState } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { QuestionItem, PRODUCT_TITLE } from '../data/productData';

interface QuestionsSectionProps {
  questions: QuestionItem[];
  onSubmitQuestion: (questionText: string) => void;
}

export const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  questions,
  onSubmitQuestion,
}) => {
  const [questionInput, setQuestionInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = questionInput.trim();
    if (!trimmed) return;
    onSubmitQuestion(trimmed);
    setQuestionInput('');
  };

  return (
    <section
      id="qa"
      className="bg-white rounded-[2px] border border-[#ECEEF2] overflow-hidden"
    >
      <div className="px-5 py-3.5 bg-[#FAFAFA] border-b border-[#ECEEF2]">
        <h2 className="text-[16px] font-semibold text-[#212121]">
          Questions About This Product ({questions.length})
        </h2>
      </div>

      {/* Ask Form */}
      <div className="p-5 border-b border-[#F0F0F0]">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder={`Ask a question about ${PRODUCT_TITLE}...`}
            aria-label="Enter your question here"
            className="flex-1 h-[40px] px-3.5 text-[13px] border border-[#DCDFE6] rounded-[2px] focus:outline-none focus:border-[#1A9CB7]"
          />
          <button
            type="submit"
            disabled={!questionInput.trim()}
            className="h-[40px] px-5 bg-[#1A9CB7] hover:bg-[#14869E] disabled:opacity-50 text-white text-[13px] font-semibold rounded-[2px] transition-colors shrink-0 cursor-pointer whitespace-nowrap"
          >
            Ask Questions
          </button>
        </form>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-[#F0F0F0]">
        {questions.map((item) => (
          <div key={item.id} className="p-5 space-y-2.5 text-[13px]">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#F57224] shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-[#212121]">{item.question}</div>
                <div className="text-[11px] text-[#9E9E9E] mt-0.5">
                  {item.askedBy} · {item.askedDate}
                </div>
              </div>
            </div>

            {item.answer ? (
              <div className="flex items-start gap-2.5 pl-0 sm:pl-1">
                <MessageCircle className="w-4 h-4 text-[#146B3A] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[#424242] leading-relaxed">{item.answer}</div>
                  <div className="text-[11px] text-[#9E9E9E] mt-0.5">
                    <span className="font-semibold text-[#E4002B]">{item.answeredBy}</span> ·{' '}
                    {item.answeredDate}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pl-6 text-[12px] text-[#757575] italic">
                Awaiting response from RedMart Official Store...
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
