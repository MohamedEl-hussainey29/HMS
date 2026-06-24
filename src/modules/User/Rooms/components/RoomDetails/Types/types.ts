export interface RoomDetailsResponse {
    success: boolean;
    message: string;
    data: {
     room: {
      _id: string;
      roomNumber: string;
      facilities:Facility[];
      price: number;
      capacity: number;
      discount: number;
      images: string[];
    };
  };
}

export interface RoomGalleryProps{
    images: string[];
}

// review
export interface ReviewFormData {
  rating: number;
  review: string;
}

export interface CreateReviewRequest {
  roomId: string;
  rating: number;
  review: string;
}

// comments
export interface CommentsFormData {
  comment: string;
}

export interface CreateCommentRequest {
  roomId: string;
  comment: string;
}

// booking card
export interface BookingCardProps {
  roomId: string;
  price: number;
  discount: number;
}

// room info
export interface Facility {
  _id: string;
  name: string;
}
export interface RoomInfoProps {
  facilities: Facility[];
}