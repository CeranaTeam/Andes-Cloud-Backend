export interface Image {
  id?: string;
  point: number;
  detectResult: any;
  labelResult: any;
  imageUrl: string;
  isCollected: boolean;
  trashCanId?: string;
  trashCanLocation?: string;
  userId: string;
  createdAt?: number;
}
