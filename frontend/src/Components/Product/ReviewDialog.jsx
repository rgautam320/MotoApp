import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ReviewDialog = ({ open, comment, setComment, rating, setRating, submitReviewToggle, reviewSubmitHandler }) => {
	return (
		<>
			<Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
				<DialogTitle>
					<h3 className="reviewDialog__heading sub-heading">Submit Review</h3>
				</DialogTitle>
				<DialogContent className="reviewDialog__content">
					<Rating className="mb-3" name="rating-ui" onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
					<textarea name="comment" className="reviewDialog__content__textArea" placeholder="Write a review" cols="30" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
				</DialogContent>
				<DialogActions>
					<Button onClick={submitReviewToggle} color="secondary">
						Cancel
					</Button>
					<Button onClick={reviewSubmitHandler} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ReviewDialog;
