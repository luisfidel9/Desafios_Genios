import * as yup from 'yup'



export const sessionSchema = yup.object({
    email: yup.string().email("Isso não é um email").required("O campo de email é obrigatório"),
    senha: yup.string().required("O campo de senha é obrigatório")
})