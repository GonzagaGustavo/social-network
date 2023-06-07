import * as Yup from "yup";

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
  bio: string;
  gender: string;
  birthday: string;
  country: string;
  estate: string;
  city: string;
}

const validation = Yup.object({
  name: Yup.string()
    .required("Por favor insira seu nome.")
    .max(150, "Seu nome deve ser menor do que 150 caracteres."),
  username: Yup.string()
    .required("Crie um username. OBS: não precisa ser seu nome.")
    .max(200, "O username não pode ser maior que 200 caracteres!"),
  email: Yup.string()
    .email("Email inválido!")
    .required("Por favor insira seu email."),
  password: Yup.string().required("Crie uma senha."),
  repeatPassword: Yup.string()
    .required("Crie uma senha.")
    .oneOf([Yup.ref("password")], "As senhas não são iguais!"),
  phone: Yup.string(),
  bio: Yup.string().max(
    1000,
    "A sua biografia não pode ser maior que 1000 caracteres."
  ),
  gender: Yup.string()
    .oneOf(["male", "female", "prefer not to say"], "Genero inválido!")
    .required("Selecione uma das opções para genero"),
  birthday: Yup.date().required("Prencha sua data de nascimento."),
  country: Yup.string(),
  estate: Yup.string(),
  city: Yup.string(),
});

export const initialValues: RegisterData = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  phone: "",
  bio: "",
  gender: "",
  birthday: "",
  country: "",
  estate: "",
  city: "",
};

export default validation;
