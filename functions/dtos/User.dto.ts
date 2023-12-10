type UserLocalRegisterDTO = {
  readonly uid?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

type UserRegisterDTO = {
  readonly uid: string;
  readonly name: string;
  readonly email: string;
}

type UserLabelImageDTO = {
  readonly image_id: string;
  readonly user_label: string;
}


export {UserRegisterDTO, UserLabelImageDTO, UserLocalRegisterDTO};
