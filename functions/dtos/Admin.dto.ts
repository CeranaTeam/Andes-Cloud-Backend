
type AdminRegisterDTO = {
  readonly uid: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

type AddTrashCanDTO = {
  readonly trashCanName: string;
  readonly location: string;
  base64Image: string;
  readonly imageName: string;
}


export {AdminRegisterDTO, AddTrashCanDTO};
