
type AdminRegisterDTO = {
  readonly uid: string;
  readonly name: string;
  readonly email: string;
}

type AddTrashCanDTO = {
  readonly name: string;
  readonly location: string;
  readonly base64Image: string;
}


export {AdminRegisterDTO, AddTrashCanDTO};
