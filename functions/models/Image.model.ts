export interface Image {
  id?: string;
  detectResult: any;
  labelResult: any;
  imageUrl: string;
  isCollected: boolean;
  trashCanId?: string;
  userId: string;
}
