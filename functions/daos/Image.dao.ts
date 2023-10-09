export interface ImageDAO {
  getImagesByUserId(userId: string): Promise<any>
  labelImage(userId: string, label: string, imageId: string): Promise<number>;
}
