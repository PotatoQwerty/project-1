import { StarIcon } from "@heroicons/react/24/solid";

import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export const StarRating = ({ rating }) => {
  const maxStars = 5;

  // making sure the rating is within the valid range
  const validRating = Math.min(Math.max(rating, 0), maxStars);

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, index) =>
        index < validRating ? (
          <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
        ) : (
          <StarOutline key={index} className="h-5 w-5 text-gray-300" />
        )
      )}
    </div>
  );
};
