import * as Yup from "yup";

export interface NewPostData {
  title: string;
  description: string;
}

const validation = Yup.object({
  title: Yup.string()
    .required("Adicione um título")
    .max(200, "O título não pode ser maior que 200 caracteres"),
  description: Yup.string().required("Adicione uma descrição"),
});

export const initialValues: NewPostData = {
  title: "",
  description: "",
};

export default validation;
