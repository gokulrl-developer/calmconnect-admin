import React, { useState } from 'react';
import { StarIcon, FlagIcon, EyeIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface Review {
  id: string;
  rating: number;
  userName: string;
  psychologistName: string;
  comment: string;
  sessionId: string;
  date: string;
  flagged: boolean;
}

const Reviews: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterFlagged, setFilterFlagged] = useState<string>('all');
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'R001',
      rating: 5,
      userName: 'John Doe',
      psychologistName: 'Dr. Sarah Johnson',
      comment: 'Dr. Johnson was incredibly helpful. She provided excellent guidance and really understood my concerns. The session was very productive.',
      sessionId: 'S001',
      date: '2024-01-20T10:00:00Z',
      flagged: false
    },
    {
      id: 'R002',
      rating: 4,
      userName: 'Jane Smith',
      psychologistName: 'Dr. Michael Chen',
      comment: 'Good session overall. Dr. Chen was professional and knowledgeable. Would recommend to others.',
      sessionId: 'S002',
      date: '2024-01-19T14:30:00Z',
      flagged: false
    },
    {
      id: 'R003',
      rating: 2,
      userName: 'Robert Wilson',
      psychologistName: 'Dr. Emily Rodriguez',
      comment: 'The session was not what I expected. Communication could have been better.',
      sessionId: 'S003',
      date: '2024-01-18T09:15:00Z',
      flagged: true
    },
    {
      id: 'R004',
      rating: 5,
      userName: 'Lisa Johnson',
      psychologistName: 'Dr. Sarah Johnson',
      comment: 'Amazing experience! Dr. Johnson is very empathetic and professional. Highly recommend.',
      sessionId: 'S004',
      date: '2024-01-17T16:00:00Z',
      flagged: false
    }
  ]);

  const handleFlagToggle = (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, flagged: !review.flagged }
          : review
      )
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 dark:text-green-400';
    if (rating >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const filteredReviews = reviews.filter(review => {
    const ratingMatch = filterRating === 'all' || review.rating.toString() === filterRating;
    const flaggedMatch = filterFlagged === 'all' || 
      (filterFlagged === 'flagged' && review.flagged) ||
      (filterFlagged === 'unflagged' && !review.flagged);
    return ratingMatch && flaggedMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reviews Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {reviews.filter(r => r.flagged).length} flagged reviews
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[5, 4, 3, 2, 1].map((rating) => (
          <Card key={rating} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1">
                  {renderStars(rating)}
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {reviews.filter(r => r.rating === rating).length}
                </p>
              </div>
              <div className={`text-xl font-bold ${getRatingColor(rating)}`}>
                {rating}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select
            value={filterFlagged}
            onChange={(e) => setFilterFlagged(e.target.value)}
            className="px-3 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Reviews</option>
            <option value="flagged">Flagged Only</option>
            <option value="unflagged">Unflagged Only</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`p-6 glass-card rounded-lg border-l-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200 ${
                review.flagged 
                  ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' 
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className={`font-medium ${getRatingColor(review.rating)}`}>
                      {review.rating}/5
                    </span>
                    {review.flagged && (
                      <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
                        <FlagIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">Flagged</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>By {review.userName}</span>
                    <span>•</span>
                    <span>For {review.psychologistName}</span>
                    <span>•</span>
                    <span>Session {review.sessionId}</span>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedReview(review)}
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant={review.flagged ? "success" : "danger"}
                    size="sm"
                    onClick={() => handleFlagToggle(review.id)}
                  >
                    <FlagIcon className="w-4 h-4 mr-1" />
                    {review.flagged ? 'Unflag' : 'Flag'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        title="Review Details"
      >
        {selectedReview && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(selectedReview.rating)}
                </div>
                <span className={`text-xl font-bold ${getRatingColor(selectedReview.rating)}`}>
                  {selectedReview.rating}/5
                </span>
              </div>
              {selectedReview.flagged && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <FlagIcon className="w-5 h-5" />
                  <span className="font-medium">Flagged Review</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">Review Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Review ID</label>
                    <p className="text-gray-800 dark:text-white">{selectedReview.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Date</label>
                    <p className="text-gray-800 dark:text-white">
                      {new Date(selectedReview.date).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Session ID</label>
                    <p className="text-gray-800 dark:text-white">{selectedReview.sessionId}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-3">Participants</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Reviewer</label>
                    <p className="text-gray-800 dark:text-white">{selectedReview.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Psychologist</label>
                    <p className="text-gray-800 dark:text-white">{selectedReview.psychologistName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      selectedReview.flagged 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {selectedReview.flagged ? 'Flagged' : 'Normal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Review Comment</h4>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                {selectedReview.comment}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant={selectedReview.flagged ? "success" : "danger"}
                onClick={() => {
                  handleFlagToggle(selectedReview.id);
                  setSelectedReview(null);
                }}
              >
                <FlagIcon className="w-4 h-4 mr-1" />
                {selectedReview.flagged ? 'Unflag Review' : 'Flag Review'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reviews;