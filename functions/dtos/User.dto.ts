/* eslint-disable */
type UserRegisterDTO = {
  readonly uid: string;
  readonly name: string;
  readonly email: string;
}

type UserLabelImageDTO = {
  readonly image_id: string;
  readonly user_label: string;
}

export { UserRegisterDTO, UserLabelImageDTO };