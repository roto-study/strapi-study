export interface Course {
  id: number;
  nth: number;
  imageUrl: string
  title: string;
  courseType: 'LIVE' | 'STUDY' | 'BOOK' | 'LESSON'
  price: number;
  status: 'READY' | 'STARTED' | 'ENDED'
  tags: Tag[]
}

export interface Tag {
  id: number;
  name: string
}

export interface StrapiResponse<T> {
  data: T
}
