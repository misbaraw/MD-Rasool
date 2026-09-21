import React, { useState } from 'react';
import { Star, Award, CheckCircle2, MessageSquare, Quote, Heart } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newCity || 'San Francisco, CA',
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'An exceptional dining evening',
      comment: newComment,
      dishRecommended: newDish || 'Wood-Fired Hearth Specials',
      verifiedGuest: true
    };

    setReviewsList([created, ...reviewsList]);
    setHasSubmitted(true);
    setTimeout(() => {
      setHasSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewCity('');
      setNewTitle('');
      setNewComment('');
      setNewDish('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-24 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Accolade Summary */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Critic & Guest Praise</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
              Celebrated by Food Lovers
            </h2>
          </div>

          <div className="flex items-center gap-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-stone-500 font-medium">4.9 Average Rating (1,200+ Reviews)</span>
            </div>
            <div className="w-px h-10 bg-stone-200" />
            <button
              id="write-review-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Leave a Review
            </button>
          </div>
        </div>

        {/* Press Quotes Bar */}
        <div className="p-8 rounded-3xl bg-stone-900 text-stone-100 mb-14 shadow-lg border border-stone-800 relative overflow-hidden">
          <Quote className="w-16 h-16 text-stone-800 absolute right-6 top-6 -rotate-12 pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <span className="text-amber-400 text-xs uppercase font-bold tracking-wider mb-2 block">
              Michelin Guide California Inspector Notes
            </span>
            <p className="font-serif text-xl sm:text-2xl text-stone-100 italic leading-relaxed mb-4">
              "Chef Marco Valenti harnesses living wood fire with supreme restraint. The truffle tagliolini boasts sensational al dente depth, while the dry-aged ribeye reveals charred perfection. Service is remarkably poised and warm."
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs text-stone-400 font-medium">Selected into the Michelin Guide (2023–2025)</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{review.date}</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-stone-900 mb-2 leading-tight">
                  "{review.title}"
                </h4>

                <p className="text-stone-600 text-sm leading-relaxed font-light mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900 text-sm">{review.author}</span>
                    {review.verifiedGuest && (
                      <span title="Verified Diner" className="text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">{review.location}</span>
                </div>

                {review.dishRecommended && (
                  <div className="text-right max-w-[150px]">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Recommended</span>
                    <span className="text-xs font-medium text-amber-800 truncate block">
                      {review.dishRecommended}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 shadow-2xl relative">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Tell us about your dinner at Artisan Kitchen & Hearth.
              </p>

              {hasSubmitted ? (
                <div className="py-12 text-center text-emerald-600 space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-stone-900">Thank You!</h4>
                  <p className="text-xs text-stone-500">Your review has been shared with our culinary and hospitality team.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-stone-700">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          id={`star-rating-select-${star}`}
                          onClick={() => setNewRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="rev-author" className="block text-xs font-medium text-stone-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="rev-author"
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="rev-city" className="block text-xs font-medium text-stone-700 mb-1">
                        City / Neighborhood
                      </label>
                      <input
                        id="rev-city"
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rev-title" className="block text-xs font-medium text-stone-700 mb-1">
                      Headline
                    </label>
                    <input
                      id="rev-title"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Extraordinary food and hospitality"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="rev-dish" className="block text-xs font-medium text-stone-700 mb-1">
                      Favorite Dish Ordered
                    </label>
                    <input
                      id="rev-dish"
                      type="text"
                      value={newDish}
                      onChange={(e) => setNewDish(e.target.value)}
                      placeholder="e.g. Handcrafted Truffle Tagliolini"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="rev-comment" className="block text-xs font-medium text-stone-700 mb-1">
                      Your Comments *
                    </label>
                    <textarea
                      id="rev-comment"
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your impressions on the food, ambiance, wine..."
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      id="cancel-review-modal-btn"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="submit-review-modal-btn"
                      className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
