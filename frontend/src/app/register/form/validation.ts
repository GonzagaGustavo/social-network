import * as Yup from "yup";

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
    .oneOf([Yup.ref("password")], "As senhas nãosão iguais!"),
  phone: Yup.string(),
  bio: Yup.string().max(
    1000,
    "A sua biografia não pode ser maior que 1000 caracteres."
  ),
  gender: Yup.string()
    .oneOf(["male", "female", "prefer not to say"])
    .required("Selecione uma das opções para genero"),
  birthday: Yup.string()
    .trim()
    .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .required("Prencha sua data de nascimento."),
  country: Yup.string(),
  estate: Yup.string(),
  city: Yup.string(),
});

export const initialValues = {
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
