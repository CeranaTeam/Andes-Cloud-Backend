export interface Image {
  id: number;
  name: string;
  detect_result: JSON;
  label_result: JSON;
  image_storage_id: string;
  is_collected: boolean;
  trash_can_id: number;
  user_id: number;
}
