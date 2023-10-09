export interface ImageDAO {
  getImagesByUserId(userId: string): Promise<any>
  getImagesByTrashCanId(trashCanId: string): Promise<any>
  // getImageById(imageId: string): Promise<any>
  labelImage(userId: string, label: string, imageId: string): Promise<number>;
}
