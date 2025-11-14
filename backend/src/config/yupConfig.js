import * as yup from 'yup'

export const userSchema = yup.object({
    nome: yup.string().required("Por favor preencha o campo de nome").trim(),
    email: yup.string().email().required({msg:"Por favor preencha o campo de email"}),
    senha: yup.string().required({msg:"Por favor preencha o campo de password"})
})